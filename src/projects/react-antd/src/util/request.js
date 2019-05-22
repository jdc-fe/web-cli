import axios from 'axios';
import { BASE_API_PREFIX } from 'src/config';
import { PATHS, history } from 'src/router';

axios.defaults.withCredentials = true;

function request(url, options) {
  const method = (options.method || 'get').toLowerCase();
  const opts = {
    url,
    method,
    baseURL: options.baseURL || BASE_API_PREFIX,
    headers: options.headers || {}
  };
  const optionData = options.data || {};
  if (method === 'get') opts.params = optionData;
  else opts.data = optionData;
  return axios(opts)
    .then((res) => {
      const response = res || {};
      const { status } = response;
      if (status === 200) { // http网络请求没问题
        const { data, code } = response.data;
        if (code === 200) { // 如接口无误直接返回data，有问题则将错误信息返回
          return Promise.resolve(data);
        }
        // 登录超时， 跳登录
        if (code === 101) {
          history.push(PATHS.LOGIN);
        }
        return Promise.reject(response.data || '服务器错误');
      }
      return Promise.reject(new Error(res.msg));
    })
    .catch((err) => Promise.reject(err));
}

export default request;
