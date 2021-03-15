import { BaseService } from './baseService';
import { Context } from 'beidou';
import host, { TIMEOUT_MS } from 'client/util/server';
import _URL from 'client/util/url';
import createError, { createErrorByError } from 'client/util/createError';

type Result<T> = ICommon.ServerResponse<T>;
type Page<T> = Result<ICommon.PageData<T>>;

export default class ReportService extends BaseService {
  public constructor(ctx: Context) {
    super(ctx);
  }

  public async findById(callId: string): Promise<Result<IReportService.ReportDetailVO>> {
    this.ctx.logger.info('  普通入参 callId:[', callId, ']');
    const urlAddress = `${host.pstn}/app/report/detail`;
    let res;
    try {
      const response = await this.app.curl(urlAddress, {
        method: 'GET',
        dataType: 'json',
        timeout: TIMEOUT_MS,
        data: { callId },
        headers: {
          'Accept-Encoding': 'gzip, deflate',
          Authorization: this.getoken(),
        },
      });

      if (!response?.data?.success) {
        createError(response);
      }
      res = response.data;
      this.ctx.logger.info(' 查询通话记录成功 \n', JSON.stringify(response.data));
    } catch (e) {
      this.ctx.logger.error('\n 查询通话记录详情失败 \n', e);
    }
    return res;
  }

  public async list(): Promise<Page<IReportService.ReportListVO>> {
    const { ctx } = this;
    const { secretNo = '13209644589', current = 1, pageSize = 10 } = this.getQuery() as IReportService.IQuery;
    const urlAddress = `${host.pstn}/app/report/list/phone`;
    let res;
    try {
      const response = await ctx.curl(urlAddress, {
        method: 'GET',
        dataType: 'json',
        timeout: TIMEOUT_MS,
        data: { secretNo, current, pageSize },
        headers: {
          'Accept-Encoding': 'gzip, deflate',
          Authorization: this.getoken(),
        },
      });
      if (!response?.data?.success) {
        createError(response);
      }
      res = response.data;
      ctx.logger.info('请求[', urlAddress, '] 成功 ');
    } catch (e) {
      ctx.logger.error(`\n${urlAddress}\n`, e);
      ctx.cookies.set('token', null);
      return createErrorByError(e);
    }
    return res;
  }
}
