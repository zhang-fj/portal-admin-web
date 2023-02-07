import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'sys/sysCode/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'sys/sysCode/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'sys/sysCode/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'sys/sysCode/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'sys/sysCode/load',
    method: 'get',
    params
  })
}

export function download(data) {
  return request({
    url: 'sys/sysCode/download',
    method: 'post',
    data
  })
}

export default { page, save, del, load, batchSave, download }
