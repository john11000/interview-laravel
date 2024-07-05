/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  experimental: {
    appDir: false,
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
