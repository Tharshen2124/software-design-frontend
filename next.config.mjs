
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com', // Add Cloudinary domain
      'lh3.googleusercontent.com'
    ],
  },
};

export default nextConfig;