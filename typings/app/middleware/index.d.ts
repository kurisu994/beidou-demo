// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'beidou';
import ExportCompress from '../../../app/middleware/compress';
import ExportTime from '../../../app/middleware/time';

declare module 'beidou' {
  interface IMiddleware {
    compress: typeof ExportCompress;
    time: typeof ExportTime;
  }
}
