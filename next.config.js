/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/screens/home-screen',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
