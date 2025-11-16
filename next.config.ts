import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remove experimental.serverActions entirely
  // Remove output: "standalone"
};

export default nextConfig;
