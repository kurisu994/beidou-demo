// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'beidou';
import ExportHome from '../../../app/controller/home';
import ExportMain from '../../../app/controller/main';
import ExportApiMain from '../../../app/controller/api/main';

declare module 'beidou' {
  interface IController {
    home: ExportHome;
    main: ExportMain;
    api: {
      main: ExportApiMain;
    }
  }
}
