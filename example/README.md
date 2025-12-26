# Puck Editor Example

This is an example Next.js application demonstrating how to use `@puck-editor/nextjs`.

## Getting Started

1. Install dependencies from the root directory:
   ```bash
   npm install
   ```

2. Build the library:
   ```bash
   npm run build
   ```

3. Install example dependencies:
   ```bash
   cd example
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Example Pages

- **/** - Home page with links to examples
- **/editor** - Interactive editor for creating and editing content
- **/renderer** - Server Component renderer example
- **/custom** - Custom blocks and fields example

## Development

When developing the library, you'll need to run both the library watcher and the example app in separate terminals:

**Terminal 1** (from root directory):
```bash
npm run dev
```
This starts the library build watcher (`tsup --watch`).

**Terminal 2** (from root directory):
```bash
npm run example:dev
```
This starts the Next.js development server.

Changes to the library will automatically rebuild via `tsup --watch`, and Next.js should hot reload. However:

- **Component changes**: Usually hot reload automatically
- **Type changes**: May require a page refresh
- **CSS changes**: Should hot reload automatically
- **If changes don't appear**: Try refreshing the browser or restarting the Next.js dev server

The `transpilePackages` option in `next.config.js` ensures Next.js processes the library correctly for hot reload.

