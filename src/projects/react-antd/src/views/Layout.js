import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { withRouter } from 'react-router-dom';
import Routes from 'src/router/Routes';
import styles from './Layout.less';

class Layout extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className={styles['layout-wrap']}>
          <Routes />
        </div>
      </LocaleProvider>
    );
  }
}
export default withRouter(Layout);
