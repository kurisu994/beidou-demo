// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'beidou';
import ExtendContext from '../../../app/extend/context';
type ExtendContextType = typeof ExtendContext;
declare module 'beidou' {
  interface Context extends ExtendContextType { }
}