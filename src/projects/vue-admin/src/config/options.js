
export const userSourceOptins = [
  {
    value: '0',
    label: '全部'
  },
  {
    value: '7',
    label: 'iOS'
  },
  {
    value: '3',
    label: '小米'
  },
  {
    value: '4',
    label: '华为'
  },
  {
    value: '1',
    label: '360'
  },
  {
    value: '2',
    label: '应用宝'
  },
  {
    value: '5',
    label: '豌豆荚'
  },
  {
    value: '6',
    label: '其他'
  }
];

export const platformOptions = [
  { label: '全部', value: '3' },
  { label: 'iOS', value: '2' },
  { label: 'Android', value: '1' }
];
export const targetOptions = [
  { label: '全部用户', value: 'all' }
];
export const fbTypeOptions = [
  { label: '全部', value: '0' },
  { label: '停车', value: '1' },
  { label: '月租', value: '2' },
  { label: '优惠', value: '3' },
  { label: '费用', value: '4' },
  { label: '车牌', value: '5' },
  { label: '其他', value: '6' }
];
export const fbStatusOptions = [
  { label: '待处理', value: '0' },
  { label: '已处理', value: '1' }
];
export const responseStatusOptions = [
  { label: '消息回复', value: 0 },
  { label: '电话回访', value: 1 },
  { label: '忽略', value: 2 }
];
export const discoverMethodOptions = [
  { label: 'H5页面', value: 1 },
  { label: '富文本文章', value: 2 },
  { label: '功能应用ID', value: 3 },
  { label: '不跳转', value: 4 }
];
export const moreOptions = [
  { label: 'H5页面', value: '1' },
  { label: '富文本文章', value: '2' },
  { label: '功能应用ID', value: '3' },
  { label: '不跳转', value: '4' }
];
export const jumpOptions = [
  { label: '1', value: '跳转' },
  { label: '0', value: '不跳转' }
];

export const noSourceOptions = [
  { label: '1', value: '原创' },
  { label: '0', value: '非原创' }
];

export const sourceOptions = [
  { label: '1', value: '原创' },
  { label: '0', value: '非原创' }
];

export const platformRadios = [
  { label: '1', value: 'Android' },
  { label: '2', value: 'iOS' }
  // { label: '3', value: '其他' }
];
export const updateRadios = [
  { label: '1', value: '是' },
  { label: '0', value: '否' }
];
export const warnRadios = [
  { label: '1', value: '提示' },
  { label: '0', value: '不提示' }
];
export const jumpRadios = [
  { label: '1', value: '跳转' },
  { label: '0', value: '不跳转' }
];
export const shareRadios = [
  { label: '1', value: '分享' },
  { label: '0', value: '不分享' }
];
export const tokenRadios = [
  { label: '1', value: '携带' },
  { label: '0', value: '不携带' }
];
export const appRadios = [
  { label: '1', value: 'Android' },
  { label: '2', value: 'iOS' }
];
export const pushRadios = [
  { label: '0', value: '即时发送' },
  { label: '1', value: '定时发送' }
];
export const newApplication = [
  { label: 'H5', value: '1' }
];
export const showTypeOptions = [
  { label: 1, value: '分享' },
  { label: 0, value: '不分享' }
];

export const departmentOptions = [
  {
    value: '1',
    label: '新增部门'
  },
  {
    value: '2',
    label: '车辆运营部'
  },
  {
    value: '3',
    label: 'xxxxx部'
  }
];
export const userJurisdiction = [{
  id: 1,
  label: '用户管理',
  children: [{
    id: 4,
    label: '用户查询',
  }]
}, {
  id: 2,
  label: 'APP管理',
  children: [{
    id: 5,
    label: '版本管理'
  }, {
    id: 6,
    label: '启动广告页管理'
  }, {
    id: 7,
    label: 'Banner管理'
  }, {
    id: 8,
    label: '首页应用导航管理'
  }, {
    id: 9,
    label: '意见反馈管理'
  }, {
    id: 10,
    label: '支付通道配置'
  }, {
    id: 11,
    label: 'APP分享管理'
  }, {
    id: 12,
    label: '消息推送管理'
  }]
}, {
  id: 3,
  label: '报表统计',
  children: [{
    id: 7,
    label: 'APP注册量统计'
  }, {
    id: 8,
    label: 'Banner点击量'
  }, {
    id: 9,
    label: '启动页点击量'
  }]
}, {
  id: 4,
  label: '内容管理',
  children: [{
    id: 7,
    label: '出行百科'
  }]
}, {
  id: 5,
  label: '系统管理',
  children: [{
    id: 7,
    label: '管理员管理'
  }, {
    id: 8,
    label: '角色部门管理'
  }]
}];

// others

// 支付方式
export const payTypeOptions = [
  { key: '1', value: '京东支付' },
  { key: '2', value: '招商银行' },
  { key: '3', value: '微信' },
  { key: '4', value: '支付宝' },
  { key: '5', value: '云闪付' },
  { key: '6', value: '翼支付' }
];

// 状态
export const onlineStatusOptions = [
  { key: '0', value: '待上线' },
  { key: '1', value: '已下线' },
  { key: '2', value: '执行中' },
  { key: '3', value: '已取消' } // 已删除
];
