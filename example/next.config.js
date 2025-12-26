/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: ['@puck-editor/nextjs'],
	// Note: With Turbopack (Next.js 16+ default), hot reload should work automatically
	// The transpilePackages option ensures the library is processed correctly
};

module.exports = nextConfig;
