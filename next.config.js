/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["earlyfusedevbucket.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
