/** @type {import('next').NextConfig} */
const path = require("path");
// const isProd = process.env.NODE_ENV === "production";
// const PRODUCTION_BASE_URL = "https://innerxr.com";

const nextConfig = {
  // assetPrefix: isProd ? PRODUCTION_BASE_URL : undefined,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "",
  distDir: "out",
};

module.exports = nextConfig;
