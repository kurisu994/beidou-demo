import { Context } from 'beidou';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const context: Context = {} as Context;

context.success = function (data) {
  this.body = {
    success: true,
    data,
  };
};

export default context;
