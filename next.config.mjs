/** @type {import('next').NextConfig} */
const nextConfig = {
  // trailingSlash: true,   // remove this line
  // output: 'standalone',  // remove this line
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
};
export default nextConfig;
