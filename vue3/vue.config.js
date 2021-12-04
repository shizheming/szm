module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://pre-manage.mingqijia.com/',
        changeOrigin: true
      }
    },
  },
};
