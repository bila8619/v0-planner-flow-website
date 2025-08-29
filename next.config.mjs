/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ remove `output: 'export'`
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
