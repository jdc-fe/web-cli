
// todo 做一个透明拦截器

// 拦截函数返回值
export const after = fn => (...args) => {
  try {
    const data = fn(...args);
    return { code: 200, message: '', data };
  } catch (message) {
    return { code: 500, message, data: null };
  }
};

// json 返回值
export const mergeOk = data => ({
  code: 200,
  message: 'ok',
  data
});
