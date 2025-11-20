import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/drone_accidents_dashboard',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
