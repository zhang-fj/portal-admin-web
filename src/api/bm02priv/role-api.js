import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm02priv/role/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm02priv/role/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm02priv/role/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm02priv/role/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm02priv/role/load',
    method: 'get',
    params
  })
}

export function download(data) {
  return request({
    url: 'bm02priv/role/download',
    method: 'post',
    data
  })
}

export function auth(data) {
  return request({
    url: 'bm02priv/role/auth',
    method: 'post',
    data
  })
}

export function getAuthFuncIds(params) {
  return request({
    url: 'bm02priv/role/getAuthFuncIds',
    method: 'get',
    params
  })
}

export default { page, save, del, load, batchSave, auth, getAuthFuncIds, download }
