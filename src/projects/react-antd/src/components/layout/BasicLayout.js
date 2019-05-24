import React from 'react';
import { observer, inject } from 'mobx-react';
import WithAuth from './WithAuth';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from './BasicLayout.less';

@inject('layout')
@observer
class BasicLayout extends React.Component {
  constructor(props) {
    super(props);
    const { layout: { getMenuData } } = props;
    getMenuData('/');
  }

  render() {
    const {
      layout: { menuData, foldSidebar }, routeContent
    } = this.props;
    return (
      <div className={`${styles.layout} ${foldSidebar && styles.fold}`}>
        <Sidebar menuData={menuData} />
        <div className={styles['layout-container']}>
          <div className={styles.container}>
            <Header />
            {routeContent}
          </div>
        </div>
      </div>
    );
  }
}

export default WithAuth(BasicLayout);
