import Mock from 'mockjs';
import {
  COLUMN_CONFIG
} from 'src/components/dataStoreService/dbMonitor/columnConfig';
import { after } from './interceptor';

// debug mock list
export const getList = (column) => {
  const obj = column.reduce((pre, cur) => ({
    ...pre,
    [cur.dataIndex]: cur.title
  }), {});
  return [1, 2, 3, 4, 4, 5, 6].map(i => ({
    ...obj,
    id: i,
    [column[0].dataIndex]: i,
  }));
};

export const getProdDBInfo = req => {
  const [, dbType] = req.url.match(/(\d)\?/);
  const col = {
    0: COLUMN_CONFIG.mysql,
    2: COLUMN_CONFIG.oracle,
    // 3: COLUMN_CONFIG.hive,
    5: COLUMN_CONFIG.redis
  }[dbType];
  if (!col) throw '参数异常';
  return getList(col);
};

Mock.mock(/\/dbresource\/dbInfo\/prod/, after(getProdDBInfo));
