import request from '@/utils/request'

export function apiGetShop() {
	return request({
		url: '/wx/shop/query',
		method: 'get',
	})
}

export function apiDistance(from){
  return request({
    url: '/wx/shop/distance',
    method: 'get',
    data: {
      from
    }
  })
}