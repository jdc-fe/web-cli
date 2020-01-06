/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function hasLength(str) {
  // const valid_map = ['admin', 'lanchunqiu@jd.com', 'jiangdonghai@jd.com']
  return str.trim().length > 0;
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validPassword(str) {
  const reg = /^(?=.*[a-zA-Z])(?=.*[1-9])(?=.*[\W|_]).{8,18}$/;
  return reg.test(str);
}

export const validatePassword = (rule, value, callback) => {
  if (!validPassword(value)) {
    callback(new Error('密码长度最少8位，最多18位，必须包含字母、数字和特殊符号'));
  } else {
    callback();
  }
};

export const validateUsername = (rule, value, callback) => {
  if (!hasLength(value)) {
    callback(new Error('请输入账号'));
  } else {
    callback();
  }
};

export const checkNumber = (rule, value, callback) => {
  const reg = /(^\d{1,2}$)|(\d+(\.{1})+(\d{1,2})$)/;
  if (!value && value !== 0) {
    callback(new Error('输入不能为空'));
  }
  if (value >= 100) {
    callback(new Error('输入需小于100'));
    return;
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('输入不合法'));
  }
};
export const checkPhone = (rule, value, callback) => {
  const reg = /^[1][23457689][0-9]{9}$/;
  if (!value) {
    callback(new Error('手机号码不能为空'));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号'));
  }
};
export const checkGlobalPhone = (rule, value, callback) => {
  const reg = /^\d{0,5}-{0,1}\d{3,15}$/;
  if (!value) {
    callback(new Error('手机号码不能为空'));
  }
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的手机号'));
  }
};

export const checkEmoji = (rule, value, callback) => {
  const reg = /[\ud800-\udbff][\udc00-\udfff]/g;
  if (reg.test(value)) {
    callback(new Error('输入不合法'));
  } else {
    callback();
  }
};

export const checkUrl = (rule, value, callback) => {
  // eslint-disable-next-line
  const reg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/g;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error('请按照正确格式输入网址'));
  }
};
