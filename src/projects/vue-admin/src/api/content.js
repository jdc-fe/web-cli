import request from '@/api/request';
import * as content from '@/mock/content';
import { isMock } from '@/config';
// 获取出行百科列表列表
export const getTravelideaList = async (data) => {
  if (isMock) return content.contentList;
  const res = request({
    url: '/backend/travelidea/list',
    method: 'post',
    data
  });
  return res;
};
// 新增出行百科
export const addTravelidea = async (data) => {
  if (isMock) return content.successStatus;
  const res = request({
    url: '/backend/travelidea/add',
    method: 'post',
    data
  });
  return res;
};
// 编辑出行百科
export const editTravelidea = async (data) => {
  if (isMock) return content.successStatus;
  const res = request({
    url: '/backend/travelidea/edit',
    method: 'post',
    data
  });
  return res;
};
// 删除出行百科或下线
export const delteTravelidea = async (data) => {
  if (isMock) return content.successStatus;
  const res = request({
    url: '/backend/travelidea/operate',
    method: 'post',
    data
  });
  return res;
};
// 获取出行百科详情
export const getDetailTravelidea = async (data) => {
  if (isMock) return content.contenDetail;
  const res = request({
    url: '/backend/travelidea/detail',
    method: 'post',
    data,
  });
  return res;
};
