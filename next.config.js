const path = require('path');
const withTM = require('next-transpile-modules')(['react-timezone-select']);

module.exports = withTM({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
})