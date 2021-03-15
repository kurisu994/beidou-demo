import { Controller } from 'beidou';
export default class MainApiController extends Controller {
  public async list() {
    const { ctx } = this;
    const res = await ctx.service.main.list();
    ctx.success(res);
  }

  public async detail() {
    const { ctx } = this;
    const { callId } = ctx.params;
    const res = await ctx.service.main.findById(callId);
    ctx.success(res);
  }
}
