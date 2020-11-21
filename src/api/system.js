import request from '@/utils/request'

export function auth(params) {
  return request({
    url: '/login',
    method: 'post',
    params
  })
}
export function menu(params) {
  return request({
    url: '/system/menu',
    method: 'get',
    params
  })
}

export function table() {
  return request({
    url: '/system/table',
    method: 'get'
  })
}
