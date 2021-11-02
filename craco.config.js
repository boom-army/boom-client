const CracoLessPlugin = require("craco-less");

module.exports = {
  style: {
    css: {
        loaderOptions: (cssLoaderOptions, { env, paths }) => { return cssLoaderOptions; }
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#2abdd2" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
