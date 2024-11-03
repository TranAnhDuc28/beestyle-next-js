/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: 'theme.hstatic.net'
            },
            {
                hostname: 'via.placeholder.com'
            },
            {
                hostname: 'yody.vn'
            }
        ],
    }
};

export default nextConfig;
