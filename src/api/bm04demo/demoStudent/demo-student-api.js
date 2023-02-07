import request from '@/utils/request'

export function page(data) {
  return request({
    url: 'bm04demo/demoStudent/page',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: 'bm04demo/demoStudent/save',
    method: 'post',
    data
  })
}

export function batchSave(data) {
  return request({
    url: 'bm04demo/demoStudent/batchSave',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: 'bm04demo/demoStudent/del',
    method: 'delete',
    data: ids
  })
}

export function load(params) {
  return request({
    url: 'bm04demo/demoStudent/load',
    method: 'get',
    params: params
  })
}

export function download(data) {
  return request({
    url: 'bm04demo/demoStudent/download',
    method: 'post',
    data
  })
}

export default { page, save, del, load, batchSave, download }
