/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const moment = require('moment');

const encoding = 'UTF-8';
const envs = ['dev', 'test', 'prod'];
let env = process.argv.splice(2)[0] || 'dev';

if (!envs.includes(env)) {
  console.log(`不可用的环境：${env}，请使用${envs}`);
  return;
}
// 打包时间
const time = moment().format('YYYY.MM.DD HH:mm');

// 配置文件写入
const envFilePath = './config.json';
if (env === 'prod') {
  env = '';
}

updateConfig();
fixBuildErr();

/**
 * 修改配置文件
 */
function updateConfig() {
  let build = { env, time };
  let oldConfig = {};
  // 读取原来的配置
  try {
    if (fs.existsSync(envFilePath)) {
      const data = fs.readFileSync(envFilePath);
      oldConfig = JSON.parse(data.toString());
    }
    const version = oldConfig.version;
    if (!version) {
      oldConfig.version = '1.0.0';
    } else {
      const verArr = version.split('.').map((r) => Number(r));
      for (let i = verArr.length - 1; i > 0; i--) {
        if (verArr[i] + 1 > 9) {
          verArr[i] = 0;
        } else {
          verArr[i] = verArr[i] + 1;
          break;
        }
      }
      oldConfig.version = verArr.join('.');
    }
    console.log(oldConfig);
  } catch (error) {
    console.log(error);
  }

  // 写入新的配置
  try {
    build = { ...oldConfig, ...build };
    fs.writeFileSync(envFilePath, JSON.stringify(build, null, 2));
  } catch (error) {
    console.log(error);
  }
}

/**
 * 修复build时webpack版本导致的报错
 */
function fixBuildErr() {
  const filePath = './node_modules/beidou-webpack/bin/build.js';
  // 打开文件
  fs.readFile(filePath, 'utf8', (err, files) => {
    let result = files.replace(
      "fs.writeFileSync(path.join(process.cwd(), '.stats'), stats);",
      "fs.writeFileSync(path.join(process.cwd(), '.stats'), stats.toString());",
    );
    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
}

/**
 * 文件复制
 * @param sourcePath 源路径
 * @param targetPath 目标路径
 */
function copyfile(sourcePath, targetPath) {
  // 文件读取
  let data;
  try {
    data = fs.readFileSync(sourcePath, encoding);
  } catch (e) {
    console.error(`文件${sourcePath}读取失败`, e);
  }
  // 文件写入
  try {
    if (data) {
      fs.writeFileSync(targetPath, data);
    }
  } catch (e) {
    console.error(`文件${targetPath}写入失败`, e);
  }
}

/** 批量删除文件 */
function deleteFiles(pathList) {
  pathList.forEach((t) => deleteFolder(t));
}

/** 删除文件或文件夹 */
function deleteFolder(path) {
  let files = [];
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isFile()) {
      fs.unlinkSync(path); // 删除文件
    } else {
      files = fs.readdirSync(path);
      files.forEach((file, index) => {
        let curPath = path + '/' + file;
        if (fs.statSync(curPath).isDirectory()) {
          // recurse
          deleteFolder(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    }
  }
}
