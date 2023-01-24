/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.osopcloud.com",
  changefreq: "weekly",
  exclude: ["/500"],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
