import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm02priv/postRole/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm02priv/postRole/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm02priv/postRole/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm02priv/postRole/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm02priv/postRole/load',
    method: 'get',
    params
  })
}

export function download(data) {
  return request({
    url: 'bm02priv/postRole/download',
    method: 'post',
    data
  })
}

export function getRolesByPostId(params) {
  return request({
    url: 'bm02priv/postRole/getRolesByPostId',
    method: 'get',
    params
  })
}

export default { page, save, del, load, batchSave, download, getRolesByPostId }
