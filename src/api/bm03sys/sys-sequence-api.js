import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm03sys/sysSequence/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm03sys/sysSequence/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm03sys/sysSequence/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm03sys/sysSequence/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm03sys/sysSequence/load',
    method: 'get',
    params: params
  })
}

export function download(data) {
  return request({
    url: 'bm03sys/sysSequence/download',
    method: 'post',
    data
  })
}

export default { page, save, del, load, batchSave, download }
