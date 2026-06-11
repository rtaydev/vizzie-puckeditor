import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	transpilePackages: ['@rtaydev/vizzie-editor'],
};

export default nextConfig;
