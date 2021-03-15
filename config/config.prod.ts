/**
 * config file for aoneEnv: prod
 *
 * @extends /config/config.default.js
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'beidou';
import path from 'path';
import customConfig from '../config.json';

export default (appinfo: EggAppInfo): any => {
  const config: PowerPartial<EggAppConfig> = {};

  config.logger = {
    dir: path.join(`${appinfo.root}/web/logs`, `${customConfig?.env || ''}portal.feewee.cn`),
    level: 'INFO',
  };
  return config;
};
