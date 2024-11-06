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
            },
            {
                hostname: 'm.yodycdn.com'
            }
        ],
    }
};

export default nextConfig;
