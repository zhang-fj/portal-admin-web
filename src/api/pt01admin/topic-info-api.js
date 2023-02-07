import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'admin/topicInfo/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'admin/topicInfo/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'admin/topicInfo/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'admin/topicInfo/del',
    method: 'delete',
    data: ids
  })
}

export function release(ids) {
  return request({
    url: 'admin/topicInfo/release',
    method: 'post',
    data: ids
  })
}

export function back(ids) {
  return request({
    url: 'admin/topicInfo/back',
    method: 'post',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'admin/topicInfo/load',
    method: 'get',
    params: params
  })
}

export default { page, save, del, load, release, back, batchSave }
