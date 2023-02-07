import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm03sys/unit/page',
    method: 'post',
    data
  })
}

export function list(data) {
  return request({
    url: 'bm03sys/unit/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm03sys/unit/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm03sys/unit/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm03sys/unit/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm03sys/unit/load',
    method: 'get',
    params
  })
}

export function download(data) {
  return request({
    url: 'bm03sys/unit/download',
    method: 'post',
    data
  })
}

export default { page, list, save, del, load, batchSave, download }
