/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: 'robohash.org',
        hostname: 'wp.caribbeanconcept.net',
      },
    ],
  },
}

module.exports = nextConfig
