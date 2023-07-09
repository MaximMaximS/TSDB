// @ts-check

const prod = process.env.NODE_ENV === "production";

const CSP = `
default-src 'self';
script-src ${!prod && "'unsafe-eval'"} 'unsafe-inline' 'self';
style-src 'self' 'unsafe-inline';
object-src 'none';
base-uri 'self';
connect-src 'self';
font-src 'self';
frame-src 'self';
img-src 'self';
manifest-src 'self';
media-src 'self';
worker-src 'none';
`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: CSP.replace(/\s+/g, " ").trim(),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Origin-Agent-Cluster",
            value: "?1",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Download-Options",
            value: "noopen",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },

          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
          {
            key: "X-XSS-Protection",
            value: "1",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
