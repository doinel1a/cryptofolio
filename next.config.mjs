/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com'
      },
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com'
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
