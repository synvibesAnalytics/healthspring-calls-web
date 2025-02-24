/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack(config) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              publicPath: "/_next/static/audio/",
              outputPath: "static/audio/",
              name: "[name].[ext]",
              esModule: false, // Important for file-loader v6+
            },
          },
        ],
      });
      return config;
    },
  };
  
  export default nextConfig; // Use export default