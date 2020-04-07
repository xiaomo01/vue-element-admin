import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/sys-config/list',
    method: 'get',
    params: query
  })
}

export function configAdd(query) {
  return request({
    url: '/sys-config/add',
    method: 'post',
    params: query
  })
}

export function deleteItem(id) {
  return request({
    url: '/sys-config/delete',
    method: 'post',
    params: id
  })
}
