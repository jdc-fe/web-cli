import request from '@/api/request';

export const upload = async (data) => {
  const res = await request({
    url: '/backend/banner/uploadFile',
    method: 'post',
    data
  });
  return res.data;
};
