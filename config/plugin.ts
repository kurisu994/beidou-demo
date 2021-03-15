import { EggPlugin } from 'beidou';

const plugin: EggPlugin = {
  static: true,
  security: true,

  cors: {
    enable: true,
    package: 'egg-cors',
  },
};

export default plugin;
