import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/projects/biolog-memory", destination: "/projects/hippovoice", permanent: true },
      { source: "/projects/pacer-mvcc", destination: "/projects/pacer", permanent: true },
    ];
  },
};

export default nextConfig;
