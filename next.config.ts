import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    // The catalog lived at /jobs before the tab was named Prompts. Keep the
    // old links working rather than 404ing anyone who bookmarked one.
    return [{ source: "/jobs", destination: "/prompts", permanent: true }];
  },
};

export default nextConfig;
