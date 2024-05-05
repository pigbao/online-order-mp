import request from '@/utils/request'

export function apiAddCart(data) {
	return request({
		url: '/wx/cart/add',
		method: 'post',
		data
	})
}

export function apiUpdateCart(data) {
	return request({
		url: '/wx/cart/update',
		method: 'post',
		data
	})
}

export function apiGetCartList(isTakeout) {
	return request({
		url: '/wx/cart/query',
		method: 'get',
		data: {
			isTakeout
		}
	})
}

export function apiDelCart(id){
	return request({
		url: '/wx/cart/del',
		method: 'post',
		data: {
			id
		}
	})
}

export function apiClearCart(isTakeout){
	return request({
		url: '/wx/cart/clear',
		method: 'post',
		data: {
			isTakeout
		}
	})
}