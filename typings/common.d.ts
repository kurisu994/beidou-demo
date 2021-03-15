declare namespace ICommon {
  interface Request {
    /**
     * 请求方式 GET | POST 等
     */
    method: string;
    url: string;
    /**
     * Header 对象
     */
    header: any;
  }

  interface Response {
    /**
     * http响应状态 404 500 等
     */
    status: number;

    /**
     * 返回结果描述
     */
    message: string;
    header: object;
  }

  /**
   * 服务器数据格式
   */
  interface ServerResponse<T> {
    success?: boolean;
    data?: T;
    code?: number;
    result?: string;
  }

  /**
   * 分页参数
   */
  interface Pagination {
    current: number;
    pageSize?: number;
    lastPage?: boolean;
  }

  /**
   * 分页数据格式
   */
  interface PageData<T> {
    data: T[];
    pagination: Pagination;
  }
}
