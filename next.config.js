/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
    ],
  },
    distDir: 'build',
    typescript: {
    ignoreBuildErrors: true,
  },}

module.exports = nextConfig
