/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['gogocdn.net'],
    },
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'gogocdn.net',
                port: '',
                pathname: '/cover/**',
            },
            {
                protocol: 'https',
                hostname: 'gogocdn.net',
                port: '',
                pathname: '/images/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/video/:path*', // Path you use in your frontend code
                destination: 'https://www048.anzeat.pro/:path*', // Proxy target
            },
        ];
    },
};

export default nextConfig;
