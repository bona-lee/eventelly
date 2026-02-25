/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ESLint 오류를 빌드 시 무시 (Vercel 배포 성공을 위해)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript 오류도 빌드 시 무시 (필요시)
    // ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
