import URL, { UrlWithParsedQuery } from 'url';

interface UrlWithQuery extends UrlWithParsedQuery {
  [key: string]: any;
}

interface UrlQueryObject {
  [key: string]: any;
}

const _URL = {
  parse: URL.parse,
  format: URL.format,
  resolve: URL.resolve,

  /**
   * @desc 合并生成新的url
   * @param {String|Object} base 原始url或者URLObject
   * @param {String|Object} url 要合并过去的url或者urlObject
   *
   * @return {String} 返回merge过后的新的url
   *
   * @example
   *     URL.merge(location.href, {
   *         query: {
   *             lang: 'zh_CN'
   *         }
   *     })
   */
  merge: (base: UrlWithQuery, url: UrlWithQuery): string => {
    if (typeof base === 'string') {
      base = URL.parse(base, true);
      delete base.search;
    }

    if (typeof url === 'string') {
      url = URL.parse(url, true);
      delete base.search;
    }

    Object.keys(url).forEach((key: string) => {
      if (key === 'query') {
        base.query = Object.assign(base.query || {}, url.query);
        //新的查询参数要复制到search里，format的时候才起作用
        base.search = _URL.queryToUrlParams(base.query);
      } else {
        base[key] = url[key];
      }
    });
    return _URL.format(base);
  },

  /**
   * 拼接URL
   */
  toUrl: (base: UrlWithParsedQuery): string => {
    return `${base.protocol}//${base.host}${base.pathname}${_URL.queryToUrlParams(base.query)}${base.hash || ''}`;
  },

  /**
   * 参数对象转链接参数字符串
   */
  queryToUrlParams: (query: UrlQueryObject): string => {
    let queryString: string = '';
    Object.keys(query).forEach((key: string) => {
      queryString += `${key}=${query[key]}&`;
    });
    if (queryString.indexOf('&') > 0) {
      queryString = `?${queryString.substr(0, queryString.length - 1)}`;
    }
    return queryString;
  },

  /**
   * 当前url
   */
  current: (url?: string): UrlWithParsedQuery => {
    const base: UrlWithParsedQuery = URL.parse(url || window.location.href, true);
    // 如果参数串被分在了哈希值里
    if (base.hash && base.hash.indexOf('?') > 0) {
      const queryStr: string = base.hash.split('?')[1];
      const queryArray: string[] = queryStr.split('&');
      const query: { [key: string]: string } = {};
      for (let i = 0; i < queryArray.length; i++) {
        const temp = queryArray[i].split('=');
        query[temp[0]] = temp[1];
      }
      base.query = query;
      //新的查询参数要复制到search里，format的时候才起作用
      base.search = _URL.queryToUrlParams(base.query);
      base.hash = base.hash.split('?')[0];
    }
    return base;
  }
};

export default _URL;
