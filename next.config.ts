import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/projects/biolog-memory", destination: "/projects/hippovoice", permanent: true },
      { source: "/projects/pacer-mvcc", destination: "/projects/pacer", permanent: true },
      { source: "/shelfsense", destination: "/projects/shelfsense", permanent: false },
      { source: "/shelfsense/early-access", destination: "/projects/shelfsense#interest", permanent: false },
    ];
  },
};

export default nextConfig;
