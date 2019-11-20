/* eslint-disable */
import Mock from 'mockjs';

Mock.mock(/\/proxyauth\/auth/, { code: 200 })

Mock.mock(/\/r2m\/appManagement\/appList\/data/, {
  status: 0,
  'data|5-15': [{
    "id|100-1000": 984,
    "name": "r2m_statistic",
    "description": "r2m_statistic",
    "clusterType": "cluster",
    "status|1": ["运行中", '升级中', '已宕机', 'PFAIL', '阻塞'],
    "memMax": 5000,
    "slaveCount": 1,
    "encrypted": false,
    "deleted": 0,
    "createdTime": 1566286318000,
    "modifiedTime": 1572518382000,
    "businessLineId": null,
    "lastSwitchDcTime": null,
    "valid": true,
    "allRedis": 11,
    "runningRedis": 11,
    "businessLineName": null,
    "memUsed": 900,
    "memUsage": 0.17999964000072,
    "memUsageStr": "18.00%"
  }]
});

Mock.mock(/\/r2m\/api\/app\/\d+\/redis/, {
  status: 0,
  'data|5-15': [{
    "id|1-100": 6025,
    "ip": "10.245.243.152",
    "port": 5001,
    "status|1": ["running", 'updating', 'down', 'fail', 'PFAIL', 'block'],
    "appId": 984,
    "agentId": 49,
    "memUsed|1-1000": 180,
    "memMax|1000-2000": 1000,
    "clusterType": "cluster",
    "instanceType": "redis_original",
    "diskMax": "0",
    "diskUsed": "0",
    "version": "redis_3.2.3-1.5",
    "role": "master",
    "masterId": 0,
    "deleted": 0,
    "createdTime": 1566286318000,
    "modifiedTime": 1573525340000,
    "memFragmentationRatio": 1.04,
    "slotCount": 0,
    "autoAverageSlot": 0,
    "slaveOf": "-",
    "agentGroupName": null,
    "dataCenterId": null,
    "dataCenterName": null,
    "masterDataCenterName": null,
    "changedSlotCount": 0,
    "migratingSlotCount": 0,
    "appName": "r2m_statistic",
    "ipAndPort": "10.245.243.152:5001",
    "memUsage": 0.17999820001799982,
    "ipPort": "10.245.243.152:5001"
  }]
});
