var Dotenv = require('dotenv-webpack');

module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  plugins: [
    new Dotenv()
  ]
}
