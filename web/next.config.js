/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
      { protocol: "https", hostname: "www.kallenhard.co.uk" },
    ],
  },
  async rewrites() {
    const apiUrl = process.env.API_URL || "http://localhost:8080";
    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;