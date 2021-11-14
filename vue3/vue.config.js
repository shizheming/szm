module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://st1-manage.mingqijia.com/',
        changeOrigin: true
      }
    },
  },
};
