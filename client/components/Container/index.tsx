import React from 'react';
import Loading from 'client/components/Loading';
import Exception, { ExceptionType } from 'client/components/Exception';
import './style.less';

interface Props {
  loading?: boolean;
  errType?: ExceptionType;
  errMsg?: string;
  children?: any;
}

function Container({ loading = false, errType = 'default', errMsg = '', children }: Props) {
  if (errMsg !== '') {
    return <Exception type={errType} message={errMsg} />;
  }
  if (loading) {
    return <Loading />;
  }
  return <section className="container">{children}</section>;
}

Container.options = {
  addGlobalClass: true
};

export default Container;
