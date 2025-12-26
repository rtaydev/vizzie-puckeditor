const Database = require('better-sqlite3');
const { join } = require('path');
const { existsSync, mkdirSync } = require('fs');

const dbDir = join(process.cwd(), 'data');
const dbPath = join(dbDir, 'content.db');

// Ensure data directory exists
if (!existsSync(dbDir)) {
	mkdirSync(dbDir, { recursive: true });
}

// Create database connection
const db = new Database(dbPath);

// Enable foreign keys and WAL mode
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Initialize schema
db.exec(`
	CREATE TABLE IF NOT EXISTS content (
		id TEXT PRIMARY KEY DEFAULT 'default',
		data TEXT NOT NULL,
		updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
	);
	
	CREATE INDEX IF NOT EXISTS idx_content_updated_at ON content(updated_at);
`);

console.log('✅ Database initialized successfully at:', dbPath);
db.close();

