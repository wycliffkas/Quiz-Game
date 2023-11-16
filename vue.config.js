// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // Example: change the primary color
          'primary-color': '#1890ff',
          'link-color': '#1890ff',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true, 
      },
    },
  },
};
