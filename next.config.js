/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.jsdelivr.net',
          pathname: '/gh/akabab/superhero-api@0.3.0/api/images/**'
        },
      ],
    },
  }
