import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Menu } from 'antd';
import _ from 'lodash';
import { PATHS } from 'src/router';
import styles from './BasicLayout.less';

const { Item: MenuItem, SubMenu } = Menu;
@inject('layout')
@observer
class Sidebar extends Component {
  constructor(props) {
    super(props);
    const { menuData } = props;
    const filterMenuData = this.filterHideMenu(menuData);
    this.menuKeys = [];
    this.topKeys = filterMenuData.map(item => item.path);
    this.state = {
      openKeys: this.getOpenKeys(props.location),
      menus: this.getMenus(filterMenuData)
    };
  }

  componentWillReceiveProps(nextProps) {
    const { location, layout: { foldSidebar } } = nextProps;
    if (foldSidebar) {
      this.setState({
        openKeys: []
      });
    } else {
      this.setState({
        openKeys: this.getOpenKeys(location)
      });
    }
  }

  getOpenKeys = ({ pathname }) => {
    const keys = this.getKeysFromPathname(pathname);
    return _.dropRight(keys, 1);
  }

  getMenuItem = ({
    path, icon, name,
  }) => (
    <MenuItem key={path}>
      {
        <Link to={path}>
          {
          icon
            ? (<i style={{ fontSize: '14px' }} className={`iconfont ${icon}`}></i>)
            : null
          }
          <span className={styles['menu-name']}>{name}</span>
        </Link>
    }
    </MenuItem>
  );

  filterHideMenu = (menus) => menus.filter((item) => {
    if (item.hideChildrenInMenu) {
      // eslint-disable-next-line
      delete item.routes;
    }
    if (item.hideInMenu || !item.path) {
      return false;
    }
    return true;
  })

  getMenus = (originMenus) => {
    const menus = this.filterHideMenu(originMenus);
    return menus.map((menu) => {
      const {
        icon, path, name, routes: childrenRoutes
      } = menu;
      this.menuKeys.push(path);
      if (childrenRoutes) {
        return (
          <SubMenu
            key={path}
            title={(
              <span>
                <i style={{ fontSize: '14px' }} className={`iconfont ${icon}`}></i>
                <span
                  className={styles['menu-name']}
                >
                  {name}
                </span>
              </span>
            )}
          >
            {this.getMenus(childrenRoutes)}
          </SubMenu>
        );
      }
      return this.getMenuItem({ ...menu });
    });
  }

  getSelectedKeys = ({ pathname }) => { // 需考虑进入 菜单项没有的页面时（比如add页面）菜单被选中的情况
    const keys = this.getKeysFromPathname(pathname);
    const diffArr = _.difference(keys, this.menuKeys); // 找到menu里面没有的key
    const arr = _.difference(keys, diffArr); // 从这个location得出的key中去掉menu里面没有的key
    return [_.last(arr)]; // 去掉menu里面没有的key后最后一个即为应该选中的key
  }

  getKeysFromPathname = (pathname) => { // ex:转'/itgr/offsync/basic-info'为['/itgr', '/itgr/offsync', '/itgr/offsync/basic-info']
    const arr = [];
    const names = pathname && pathname.substr(1).split('/');
    const pathTotal = names.reduce((total, key) => {
      arr.push(`/${total}`);
      return `${total}/${key}`;
    });
    arr.push(`/${pathTotal}`);
    return arr;
  }

  onMenuOpenChg = (openKeys) => {
    const lastestOpenKey = _.last(openKeys);
    if (this.topKeys.indexOf(lastestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: lastestOpenKey ? [lastestOpenKey] : []
      });
    }
  }

  render() {
    const { location, layout: { foldSidebar } } = this.props;
    const { openKeys, menus } = this.state;
    return (
      <div className={`${styles['layout-sidebar']}`}>
        <div className={`${styles['sidebar-hd']}`}>
          <Link to={PATHS.HOME_PAGE}>
            <span
              className={styles.logo}
            ></span>
          </Link>
          {foldSidebar ? (<Link to={PATHS.HOME_PAGE}>
            <span className={styles['shortcut-logo']}></span>
          </Link>) : undefined }
        </div>
        <Menu
          mode="inline"
          theme="dark"
          inlineCollapsed={foldSidebar}
          openKeys={openKeys}
          onOpenChange={this.onMenuOpenChg}
          selectedKeys={this.getSelectedKeys(location)}
        >
          {menus}
        </Menu>
      </div>
    );
  }
}

export default withRouter(Sidebar);
