import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable LightningCSS (fixes module-not-found errors)
    optimizeCss: false,
  },

  // Optional but recommended for consistency
  reactStrictMode: true,

  // Required for Vercel standalone builds
  output: "standalone",
};

export default nextConfig;
