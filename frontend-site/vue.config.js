module.exports = {
  devServer: {
    port: 8081,
    proxy: {
      "/vaccination": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/appointments": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/client": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/login": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/logout": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/session": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
};
