/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.NODE_ENV === "development" ? "http://127.0.0.1:5328/api/:path*" : "/api/",
      },
    ];
  },
  env: {
    NEXT_PUBLIC_OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    NEXT_PUBLIC_TINYMCE_API_KEY: process.env.NEXT_PUBLIC_TINY_MCE_KEY,
  },
};

module.exports = nextConfig;
