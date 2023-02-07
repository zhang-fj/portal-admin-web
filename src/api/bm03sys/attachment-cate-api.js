import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm03sys/attachmentCate/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm03sys/attachmentCate/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm03sys/attachmentCate/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm03sys/attachmentCate/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm03sys/attachmentCate/load',
    method: 'get',
    params: params
  })
}

export function download(data) {
  return request({
    url: 'bm03sys/attachmentCate/download',
    method: 'post',
    data
  })
}

export default { page, save, del, load, batchSave, download }
