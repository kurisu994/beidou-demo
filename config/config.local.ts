/**
 * config file for local
 *
 * @extends /config/config.default.js
 */

import { EggAppConfig, EggAppInfo, PowerPartial } from 'beidou';
import path from 'path';

export default (appInfo: EggAppInfo): any => {
  const config: PowerPartial<EggAppConfig> = {};

  config.static = {
    maxAge: 0,
    buffer: false,
    dynamic: true,
    // dir: [ join(__dirname, '../build'), join(__dirname, '../test') ],
  };

  config.react = {
    assetHost: null,
    cache: false,
  };

  config.logger = {
    dir: path.join(appInfo.baseDir, 'logs'),
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
  };

  return config;
};
