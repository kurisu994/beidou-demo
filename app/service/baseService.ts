import { Context, Service } from 'beidou';
import _URL from 'client/util/url';

export class BaseService extends Service {
  public constructor(ctx: Context) {
    super(ctx);
  }

  public getQuery(): any {
    const query: any = _URL.current(this.ctx.request.url).query;
    this.ctx.logger.info('  链接携带参数: [', JSON.stringify(query), ']');
    return query || {};
  }

  public getoken(): string {
    const cookie = this.ctx.cookies;
    let token: string = cookie.get('token', { encrypt: true, signed: true });
    if (!token) {
      const query = _URL.current(this.ctx.request.url).query;
      token = query?.token?.toString() || undefined;
      cookie.set('token', token, {
        httpOnly: true,
        encrypt: true,
        signed: true,
      });
    }
    this.ctx.logger.info('  token: [', token, ']');
    return token;
  }
}
