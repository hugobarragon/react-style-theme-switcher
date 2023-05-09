module.exports = {
  webpack: {
    configure: (config) => {
      const oneOfRule = config.module.rules.find((rule) => rule.oneOf);

      const lazyLessRule = {
        test: /\.lazy\.less$/,
        use: [
          {
            loader: require.resolve("style-loader"),
            options: {
              injectType: "lazyStyleTag",
            },
          },
          {
            loader: require.resolve("css-loader"),
          },
          {
            loader: require.resolve("less-loader"),
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      };

      // https://github.com/facebook/create-react-app/blob/9673858a3715287c40aef9e800c431c7d45c05a2/packages/react-scripts/config/webpack.config.js#L590-L596

      // insert less loader before resource loader
      // https://webpack.js.org/guides/asset-modules/
      const resourceLoaderIndex = oneOfRule.oneOf.findIndex(
        ({ type }) => type === "asset/resource"
      );
      oneOfRule.oneOf.splice(resourceLoaderIndex, 0, lazyLessRule);

      return config;
    },
  },
};
