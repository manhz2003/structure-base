/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  env: {
    apiUrl: "https://api.storerestapi.com/",
  },
};

module.exports = nextConfig;
