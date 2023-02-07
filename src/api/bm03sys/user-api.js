import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm02priv/user/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm02priv/user/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm02priv/user/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm02priv/user/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm02priv/user/load',
    method: 'get',
    params
  })
}

export function getUserinfo(params) {
  return request({
    url: 'bm02priv/user/getUserinfo',
    method: 'get',
    params
  })
}

export function editPassword(data) {
  return request({
    url: 'bm02priv/user/editPassword',
    method: 'post',
    data
  })
}

export function download(data) {
  return request({
    url: 'bm02priv/user/download',
    method: 'post',
    data
  })
}

export default { page, save, del, load, batchSave, getUserinfo, editPassword, download }
