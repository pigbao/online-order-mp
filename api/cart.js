import request from '@/utils/request'

export function apiAddCart(data) {
	return request({
		url: '/wx/cart/add',
		method: 'post',
		data
	})
}