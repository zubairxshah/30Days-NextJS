/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'i.imgflip.com',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'edamam-product-images.s3.amazonaws.com',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            pathname: '**',
        },
        {
            protocol: 'https',
            hostname: 'randomuser.me',
            pathname: '**',
        },
    ],
    },
  }
  
  export default nextConfig;
  