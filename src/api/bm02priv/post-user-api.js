import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm02priv/postUser/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm02priv/postUser/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm02priv/postUser/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm02priv/postUser/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm02priv/postUser/load',
    method: 'get',
    params
  })
}

export function download(data) {
  return request({
    url: 'bm02priv/postUser/download',
    method: 'post',
    data
  })
}

export function getPostsByUserId(params) {
  return request({
    url: 'bm02priv/postUser/getPostsByUserId',
    method: 'get',
    params
  })
}

export default { page, save, del, load, batchSave, download, getPostsByUserId }
