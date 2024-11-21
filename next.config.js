// next.config.js
module.exports = {
  // ... rest of the configuration.
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fedoraapi.relentlessadmin.org/:path*'
      }
    ]
  }
};
