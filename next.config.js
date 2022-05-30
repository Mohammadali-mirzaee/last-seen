/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    domains: [
      "assets.adidas.com",
      "lp2.hm.com",
      "static.zara.net",
      "lp.arket.com",
      "images.puma.com",
      "lp.weekday.com"
    ],

  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  nextConfig
}

