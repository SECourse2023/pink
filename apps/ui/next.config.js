module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8848/api/:path*'
      }
    ]
  }
}
