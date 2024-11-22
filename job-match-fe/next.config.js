/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

// module.exports = {
//     webpack: (config, { isServer }) => {
//         if (!isServer && process.env.NODE_ENV === 'development') {
//             // Delay to wait for the dev server to spin up
//             setTimeout(() => {
//                 const PORT = 3000; // Adjust if using a custom port
//                 const URL = `http://localhost:${PORT}`;
//                 console.log(`Opening browser at ${URL}`);
//                 open(URL);
//             }, 1500);
//         }
//         return config;
//     },
// };