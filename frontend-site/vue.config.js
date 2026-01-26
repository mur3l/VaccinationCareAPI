module.exports = {
  devServer: {
    proxy: {
      "/vaccination": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/appointments": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/client": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
};
