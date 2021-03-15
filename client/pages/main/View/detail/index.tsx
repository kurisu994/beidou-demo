import { Button, Form, Input } from 'antd';
import cls from 'classnames/bind';
import Container from 'client/components/Container';
import { ViewProps } from 'egg';
import { inject, observer } from 'mobx-react';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import MainStore from '../../store';
import style from './index.m.less';

const cx = cls.bind(style);

interface IProps extends ViewProps {
  mainStore: MainStore;
  match: any;
}

@inject('mainStore')
@observer
class Create extends React.Component<IProps> {
  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
    const { match, mainStore } = this.props;
    const { params } = match;
    const { findById, detail } = mainStore;
    if (!detail) findById?.(params.callId);
  }

  public componentWillUnmount() {
    this.props.mainStore.detail = undefined;
  }

  public render() {
    const { detail, detailLoadding, detailErreMsg } = this.props.mainStore;
    if (!detail) {
      return null;
    }

    const { callId, recordPath, peerNo } = detail;
    const history = createBrowserHistory();
    return (
      <div className={cx('create')}>
        <Container loading={detailLoadding} errMsg={detailErreMsg}>
          <h2>User Edit</h2>
          <Form>
            <Form.Item required>
              <Input name="callId" value={callId} />
            </Form.Item>
            <Form.Item required>
              <Input name="recordPath" value={recordPath} />
            </Form.Item>
            <Form.Item required>
              <Input name="peerNo" value={peerNo} />
            </Form.Item>
          </Form>
          <Button onClick={() => history.goBack()}>返回</Button>
        </Container>
      </div>
    );
  }
}

export default Create;
