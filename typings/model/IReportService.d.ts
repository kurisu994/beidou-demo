declare namespace IReportService {
  interface IQuery {
    /**
     * 隐私号
     */
    secretNo?: string;
    /**
     * token
     */
    token?: string;
    current?: number;
    pageSize?: number;
    refresh?: boolean;
    loadMore?: boolean;
    [key: string]: any;
  }

  interface ReportListVO {
    /**
     * 拨号id
     */
    callId: string;
    /**
     * 工作人员id
     */
    staffMobile: string;
    /**
     * 客户号码
     */
    peerNo: string;
    /**
     * 拨号类型
     */
    callType: string;
    /**
     * 拨打时间
     */
    callTime: number;
    /**
     * 挂断时间
     */
    releaseTime: number;
    /**
     * 挂断方式
     */
    releaseDir: string;
    /**
     * 通话时长
     */
    callDuration: number;
    /**
     * 录音状态
     */
    recordState: string;
  }

  interface ReportDetailVO {
    subsId: string;
    callId: string;
    staffMobile: string;
    peerNo: string;
    secretNo: string;
    callType: string;
    callTime: number;
    startTime: number;
    releaseTime: number;
    ringTime: number;
    releaseDir: string;
    callDuration: number;
    recordState: number;
    recordPath: string;
    recordStateDesc: string;
  }
}
