/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Rewrite /legacy to serve the static HTML site
  async rewrites() {
    return [
      {
        source: '/legacy',
        destination: '/legacy/index.html',
      },
    ]
  },
}

module.exports = nextConfig
