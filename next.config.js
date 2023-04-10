/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.akakce.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'iis-akakce.akamaized.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
