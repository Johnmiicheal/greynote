// /** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa");
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }
// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     register: true,
//     skipWaiting: true,
//   },
// });
// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
});
module.exports = nextConfig;