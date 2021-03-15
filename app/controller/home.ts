import { Controller } from 'beidou';

export default class IndexController extends Controller {
  public async index() {
    this.logger.debug('-- 访问主页 --');
    await this.ctx.render('pages/index');
  }
}
