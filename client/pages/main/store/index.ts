import { action, comparer, computed, observable, toJS } from 'mobx';
import { getList, getDetail } from './api';
import { IStroe } from '../../../../typings/model/IStroe';
import { PageData, Pagination, DefaultPageData } from 'client/util/tool/pagination';

class MainStore implements IStroe {
  @observable
  public list: IReportService.ReportListVO[];

  @observable
  public pagination: Pagination = DefaultPageData.pagination;

  @observable
  public detail: IReportService.ReportDetailVO;

  @observable
  public loadding = true;

  @observable
  public erreMsg = '';

  @observable
  public detailLoadding = true;

  @observable
  public detailErreMsg = '';

  public constructor(init = {}) {
    Object.assign(this, init);
  }

  @computed({ equals: comparer.identity })
  public get currentLength(): number {
    if (!this.list) {
      return 0;
    }

    return this.list.length;
  }

  @action
  public getList = async (params: IReportService.IQuery) => {
    this.loadding = true;
    const list = await getList(params);
    this.initList(list);
  };

  @action
  public findById = async (callId: string) => {
    this.detailLoadding = true;
    const detail = await getDetail(callId);
    this.initDetail(detail);
  };

  @action
  public init = (initData: IMain.InitStore = {}): void => {
    const { list, detail } = initData;
    if (list) {
      this.initList(list);
    }
    if (detail) {
      this.initDetail(detail);
    }
  };

  private initList = (init: ICommon.ServerResponse<PageData<IReportService.ReportListVO>>) => {
    if (!init) {
      return;
    }
    const { data, result, success } = init;
    const { data: _data, ...other } = data;
    this.loadding = false;
    if (!success) {
      this.erreMsg = result;
      return;
    }
    this.erreMsg = '';
    this.pagination = Object.assign(this.pagination, other);
    this.list = _data;
  };

  private initDetail = (detail: ICommon.ServerResponse<IReportService.ReportDetailVO>) => {
    if (!detail) {
      return;
    }
    const { data, result, success } = detail;
    this.detailLoadding = false;
    if (!success) {
      this.detailErreMsg = result;
      return;
    }
    this.detailErreMsg = '';
    this.detail = data;
  };
}

export default MainStore;
