/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://fakestoreapi.com/img/**'),
    ],
  },
};

module.exports = nextConfig;