export default (app, defaultConfig, dev) => {
  // * customize your webpack config;
  //
  // * check your current config at `/run/webpack.local.json`
  // once after server started.

  // config easier with WebpackFacotry
  const factory = app.webpackFactory;

  const DefinePlugin = factory.getPlugin('DefinePlugin');
  DefinePlugin.options = {
    __ENV__: JSON.stringify(dev ? 'local' : 'prod'),
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    'process.env': {
      NODE_ENV: JSON.stringify(dev ? 'development' : 'production'),
      EGG_SERVER_ENV: JSON.stringify(dev ? 'local' : 'prod'),
    },
  };
  // eslint-disable-next-line no-param-reassign
  defaultConfig = factory.getConfig();

  defaultConfig.externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
  };

  defaultConfig.devtool = 'source-map';

  const babelLoader = defaultConfig.module.rules[0];

  babelLoader.use.options.babelrc = true;

  return defaultConfig;
};
