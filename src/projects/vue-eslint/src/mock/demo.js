/* eslint-disable */
import Mock from 'mockjs';
import { after, mergeOk } from './interceptor';

// /mock/diagnose
Mock.mock(/\/mock\/users\//, mergeOk({
  "net_usage|1-100": 100,
  "load_one|1-100": 100.0,
  "cpu_usage|1-100": 98.75,
  "memory_usage|1-100": 94.33
}));

Mock.mock(/\/mock\/users/, after(() => {
  const list = Mock.mock({
    "list|5-10": [{
      // "name":
      "number": "3307",
      "ip": "@ip",
      "time": '@date("yyyy-MM-dd HH:mm:ss")',
      "id": "@increment"
    }]
  }).list;
  return { list, total: list.length }
}))
