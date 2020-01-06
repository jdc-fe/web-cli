import axios from 'axios';
import {
  MessageBox,
  Notification
} from 'element-ui';
import { getToken } from '@/utils/auth';
import { headers, apiBaseUrl, env } from '@/config';
// eslint-disable-next-line
import store from '@/store';

// create an axios instance
const service = axios.create({
  baseURL: apiBaseUrl, // url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 150000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  // 如果不需要在header中加参数， 忽略以下代码
  // eslint-disable-next-line
  (config) => {
    const token = getToken() || '';
    const {
      appCode,
      // appVersion,
      // platformType,
      // deviceNo,
      // lang
    } = headers;
    config.headers = Object.assign({
      'Content-Type': 'application/json',
      appCode,
      // appVersion,
      // platformType,
      // deviceNo,
      // lang,
      token
    }, config.headers);
    return config;
  },
  (error) => {
    if (env !== 'development') console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line prefer-destructuring
    if (!['application/vnd.ms-excel;charset=UTF-8',
      'application/octet-stream;charset=UTF-8',
      'image/jpeg;charset=UTF-8'
    ].includes(response.headers['content-type'])) {
      const {
        status,
        message,
        data
      } = response;
      if (status !== 200) {
        Notification({
          title: 'error',
          message: message || 'error',
          type: 'error',
          duration: 5 * 1000
        });
        return Promise.reject(message || 'error');
      }
      if (data.code && data.code !== '00000') {
        const messages = {
          20000: '用户不存在',
          21040: '账号已在其他设备登录',
          21030: '账号登录超时，请重新登录'
        };
        if (['20000', '21040', '21030'].includes(data.code)) {
          MessageBox.confirm(messages[data.code], '重新登录', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              window.location.reload();
            });
          });
        } else {
          Notification({
            title: `error:${data.code}`,
            type: 'error',
            message: data.data || data.message || 'error',
            duration: 5 * 1000
          });
        }
        return Promise.reject(data.message || 'error');
      }
    }
    return response.data;
  },
  (error) => {
    if (env !== 'development') console.log(`err${error}`);
    Notification({
      title: 'error',
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
