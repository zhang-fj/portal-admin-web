import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm02priv/post/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm02priv/post/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm02priv/post/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm02priv/post/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm02priv/post/load',
    method: 'get',
    params
  })
}

export function download(data) {
  return request({
    url: 'bm02priv/post/download',
    method: 'post',
    data
  })
}

export default { page, save, del, load, batchSave, download }
