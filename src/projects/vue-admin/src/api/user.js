// eslint-disable-next-line
import request from '@/api/request';
import * as user from '@/mock/user';
import { isMock } from '@/config';

// 登录
export function login(data) {
  return request({
    url: '/backend/login',
    method: 'post',
    data
  });
}
// 登出
export function logout(data) {
  return request({
    url: '/backend/logout',
    method: 'post',
    data
  });
}

// 获取登录验证码
export function getCaptcha(params) {
  return request({
    responseType: 'blob',
    url: '/backend/captcha',
    method: 'get',
    params
  });
}

// 用户管理
// 获取用户列表
export const getUserList = (data) => {
  if (isMock) return user.userList;
  return request({
    url: 'backend/user/list',
    method: 'post',
    data
  });
};
// 查看用户详情
export const getUserDetail = (data) => {
  if (isMock) return user.userDetail;
  return request({
    url: '/backend/user/detail',
    method: 'post',
    data
  });
};
// 冻结/解冻用户
export const freezeUser = (data) => {
  if (isMock) return '';
  return request({
    url: '/backend/user/operate',
    method: 'post',
    data
  });
};
// 车牌详情
export const getLicencePlateInfo = (data) => {
  if (isMock) return '';
  return request({
    url: '/backend/user/car/detail',
    method: 'post',
    data
  });
};
// 查看用户认证列表
export const getUserIdentificationList = (data) => {
  if (isMock) return '';
  return request({
    url: 'api/user/list',
    method: 'post',
    data
  });
};

// eslint-disable-next-line
export const getLicensePlateDetail = () => {
  if (isMock) return user.licensePlateDetail;
};
