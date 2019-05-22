import React from 'react';
import RouteWithSubRoutes from
  'src/components/layout/RouteWithSubRoutes';
import styles from './UserLayout.less';

export default function UserLayout({ routes }) {
  return (
    <div className={styles.user}>
      <div className={styles['user-container']}>
        <div className={styles['user-container-bg']}>
          <RouteWithSubRoutes routes={routes}></RouteWithSubRoutes>
        </div>
      </div>
    </div>
  );
}
