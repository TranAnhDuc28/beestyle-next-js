const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: 'theme.hstatic.net',
            },
            {
                hostname: 'via.placeholder.com'
            },
        ]
    }
};

export default nextConfig;
