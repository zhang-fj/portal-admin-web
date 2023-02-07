import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'sys/code/page',
    method: 'post',
    data
  })
}

export function list(data) {
  return request({
    url: 'sys/code/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'sys/code/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'sys/code/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'sys/code/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'sys/code/load',
    method: 'get',
    params
  })
}

export function download(data) {
  return request({
    url: 'sys/code/download',
    method: 'post',
    data
  })
}

export default { page, list, save, del, load, batchSave, download }
