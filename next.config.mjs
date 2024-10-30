/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: 'theme.hstatic.net',
            },
        ]
    }
};

export default nextConfig;
