

export const env = process.env.NODE_ENV;
export const apiBaseUrl = process.env.VUE_APP_BASE_API;
export const isMock = true;
export const cookieExpires = 8;
export const headers = {
  appCode: 'test',
  appVersion: '1.0.0',
  platformType: 'pc',
  deviceNo: '',
  lang: 'cn', // en英文 cn 中文
};
