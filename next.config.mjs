/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/treino-plus-preview",
  assetPrefix: "/treino-plus-preview",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
