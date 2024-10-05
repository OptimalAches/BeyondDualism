/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
                // port: '',
                // pathname: '/account123/**',
            },
        ],
        domains: ['c10.patreonusercontent.com']
    }
};

export default nextConfig;