import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'admin/onlinemsg/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'admin/onlinemsg/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'admin/onlinemsg/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'admin/onlinemsg/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'admin/onlinemsg/load',
    method: 'get',
    params: params
  })
}

export function download(data) {
  return request({
    url: 'admin/onlinemsg/download',
    method: 'post',
    data
  })
}

export default { page, save, del, load, batchSave, download }
