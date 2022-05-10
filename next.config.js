const withPWA = require("next-pwa");

module.exports = withPWA({
  // Configuration for the next-pwa plugin
  pwa: {
    dest: "public",
    dynamicStartUrl: "false",
    register: false,
    skipWaiting: false,
    disable: process.env.NODE_ENV === "development",
  },
  // Configuration for Next.js
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  pageExtensions: ["tsx"],
  experimental: {
    runtime: "edge",
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
});
