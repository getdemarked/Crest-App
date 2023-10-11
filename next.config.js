const withPWA = require('next-pwa')({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  basePath: "",
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
})