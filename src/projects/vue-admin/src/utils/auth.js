import Cookies from 'js-cookie';
import { cookieExpires } from '@/config';

const TokenKey = 'spark_admin_token';
const userIdKey = 'user_id';

export function getToken() {
  return Cookies.get(TokenKey) || 'testTokenrrrrt567889tr@eergtgtgtt';
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    expires: new Date(new Date().getTime() + cookieExpires * 60 * 60 * 1000)
  });
}

export function removeToken() {
  window.sessionStorage.removeItem('vuex');
  return Cookies.remove(TokenKey);
}

export function getUserId() {
  return Cookies.get(userIdKey) || 'testUserId2222222';
}

export function setUserId(userId) {
  return Cookies.set(userIdKey, userId, {
    expires: new Date(new Date().getTime() + cookieExpires * 60 * 60 * 1000)
  });
}

export function removeUserId() {
  window.sessionStorage.removeItem('vuex');
  return Cookies.remove(userIdKey);
}
