/**
 * default config file
 * extended by any other config.{env}.js
 */

import { Application, EggAppConfig, PowerPartial } from 'beidou';
import path from 'path';

export default (appInfo: Application): any => {
  const config: PowerPartial<EggAppConfig> = {};
  config.keys = 'feewee';
  config.webpack = {
    // your webpack config file
    custom: {
      configPath: require.resolve(path.resolve(__dirname, './webpack.config')),
    },
    resolve: {
      extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
      alias: {
        client: path.join(appInfo.baseDir, 'client'),
        themes: path.join(appInfo.baseDir, 'client/themes'),
      },
    },
  };

  config.view = {
    defaultViewEngine: 'react',
    defaultExtension: '.tsx',
    root: `${path.join(appInfo.baseDir, 'app/views')},${path.join(appInfo.baseDir, 'client')}`,
  };

  config.router = {
    root: 'pages',
  };

  config.react = {
    cache: true,
  };

  config.middleware = ['compress'];
  config.compress = {
    threshold: 2048,
  };

  config.notfound = {
    root: 'pages/404',
    pageUrl: '/404',
  };

  config.static = {
    dir: [
      {
        prefix: '/public',
        dir: path.join(appInfo.baseDir, '/app/public'),
      },
      {
        prefix: '/build/',
        dir: path.join(__dirname, '../build'),
      },
    ],
  };

  config.security = {
    // 关闭csrf
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['*'],
  };

  // 允许跨域
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  return config;
};
