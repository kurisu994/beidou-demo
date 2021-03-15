import { Table, Button, ConfigProvider } from 'antd';
import cls from 'classnames/bind';
import { ViewProps } from 'egg';
import Container from 'client/components/Container';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import * as React from 'react';
import MainStore from '../../store';
import style from './index.m.less';
import zhCN from 'antd/lib/locale/zh_CN';
import { Link } from 'react-router-dom';

const cx = cls.bind(style);
interface IProps extends ViewProps {
  mainStore: MainStore;
  match: any;
}

@inject('mainStore')
@observer
export default class List extends React.Component<IProps> {
  public componentDidMount() {
    const store = this.props.mainStore || {};
    const { list = [], getList } = store as MainStore;
    if (list.length === 0) {
      getList?.({});
    }
  }
  public render() {
    const { list, loadding, erreMsg, pagination, getList } = this.props.mainStore;
    return (
      <Container errMsg={erreMsg}>
        <div className={cx('list')}>
          <ConfigProvider locale={zhCN}>
            <Table
              title={() => <h2>通话记录</h2>}
              dataSource={list}
              loading={loadding}
              rowKey="callId"
              pagination={{
                ...pagination,
                total: 401,
                onChange: (page: number, pageSize?: number) => getList({ current: page, pageSize }),
                onShowSizeChange: (current: number, size?: number) => getList({ current, pageSize: size }),
              }}
            >
              <Table.Column title="通话id" dataIndex="callId" />
              <Table.Column title="工作人员号码" dataIndex="staffMobile" />
              <Table.Column title="客户号码" dataIndex="peerNo" />
              <Table.Column title="呼叫类型" dataIndex="callType" />
              <Table.Column
                title="拨号时间"
                dataIndex="callTime"
                render={(r, i, v) => `${moment(r.callTime).format('yyyy-MM-DD HH:mm:ss')}`}
              />
              <Table.Column
                title="挂断时间"
                dataIndex="releaseTime"
                render={(r, i, v) => `${moment(r.releaseTime).format('yyyy-MM-DD HH:mm:ss')}`}
              />
              <Table.Column
                title="挂断方式"
                dataIndex="releaseDir"
                render={(record, index, value) => `${record.callDuration || 0}秒`}
              />
              <Table.Column title="通话时长" dataIndex="callDuration" />
              <Table.Column title="录音状态" dataIndex="recordState" />
              <Table.Column
                title="操作"
                render={(r, i, v) => {
                  return <Link to={`/main/report/${r.callId}`}>详情</Link>;
                }}
              />
            </Table>
          </ConfigProvider>
        </div>
      </Container>
    );
  }
}
