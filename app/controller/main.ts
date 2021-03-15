import { Controller } from 'beidou';
export default class MainController extends Controller {
  public async list() {
    const { ctx } = this;
    const res = await ctx.service.main.list();
    await ctx.render('pages/main/index.tsx', {
      data: { list: res },
    });
  }

  public async show() {
    const { ctx } = this;
    const { callId } = ctx.params;
    const res = await ctx.service.main.findById(callId);
    await ctx.render('pages/main/index.tsx', {
      data: { detail: res },
    });
  }
}
