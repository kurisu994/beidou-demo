// 读取环境配置
import config from '../../config.json';

/**
 * 用于在node端获取当前环境
 * 当前的环境用于在启动时配置环境变量 EGG_SERVER_ENV 时确定，例如启动开发环境的指令为
 * > EGG_SERVER_ENV=dev npm run dev
 * > EGG_SERVER_ENV=dev npm start
 */
interface HOST {
  pstn?: string;
  [key: string]: any;
}

const server: HOST = {};

export function setHost() {
  const proxy = config?.env ? `http://${config?.env || ''}` : 'https://';
  const _host = `${proxy}gate.feewee.cn`;

  ['pstn'].forEach((sub) => {
    server[sub] = `${_host}/${sub}`;
  });
}

export const TIMEOUT_MS = 30000;

export default server;
