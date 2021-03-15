// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'beidou';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportBaseService from '../../../app/service/baseService';
import ExportMain from '../../../app/service/main';

declare module 'beidou' {
  interface IService {
    baseService: AutoInstanceType<typeof ExportBaseService>;
    main: AutoInstanceType<typeof ExportMain>;
  }
}
