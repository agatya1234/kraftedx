import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    swcPlugins: [
      ['@next/swc-plugin-lightningcss', { 
        unstable_useLocalLightningcss: true 
      }]
    ]
  }
};

export default nextConfig;
