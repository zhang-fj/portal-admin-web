import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm03sys/attachmentFile/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm03sys/attachmentFile/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm03sys/attachmentFile/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm03sys/attachmentFile/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm03sys/attachmentFile/load',
    method: 'get',
    params: params
  })
}

export function download(data) {
  return request({
    url: 'bm03sys/attachmentFile/download',
    method: 'post',
    data
  })
}

export default { page, save, del, load, batchSave, download }
