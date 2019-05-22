import { BASE_URL } from '../config';

const demo = true;
export function login(params) {
  if (demo) {
    return Promise.resolve('admin');
  }
  return request('/user/login', {
    method: 'post',
    data: params,
    baseURL: BASE_URL
  });
}

export function logout() {
  return Promise.resolve();
}
