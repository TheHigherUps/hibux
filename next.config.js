/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "54321",
                pathname: "/storage/v1/object/public/**",
            },
            {
                protocol: "https",
                hostname: "tlnzwilqshufmsqsinff.supabase.co",
                pathname: "/storage/v1/object/public/**",
            },
        ],
    },
}

module.exports = nextConfig
