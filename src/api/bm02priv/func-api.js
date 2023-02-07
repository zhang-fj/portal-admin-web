import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm02priv/func/page',
    method: 'post',
    data
  })
}

export function list(data) {
  return request({
    url: 'bm02priv/func/list',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm02priv/func/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm02priv/func/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm02priv/func/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm02priv/func/load',
    method: 'get',
    params: params
  })
}

export function buildMenus() {
  return request({
    url: 'bm02priv/func/menus',
    method: 'get'
  })
}

export function funcTree() {
  return request({
    url: 'bm02priv/func/funcTree',
    method: 'get'
  })
}

export function download(data) {
  return request({
    url: 'bm02priv/func/download',
    method: 'post',
    data
  })
}

export default { page, list, save, del, load, batchSave, buildMenus, funcTree, download }
