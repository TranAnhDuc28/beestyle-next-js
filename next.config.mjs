const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com'
            },
            {
                hostname: 'yody.vn'
            },
            {
                hostname: 'm.yodycdn.com'
            }
        ]
    }
};

export default nextConfig;
