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
            },
            {
                hostname: 'images.unsplash.com'
            }
        ]
    }
};

export default nextConfig;
