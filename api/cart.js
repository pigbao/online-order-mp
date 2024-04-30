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

export function apiGetCartList() {
	return request({
		url: '/wx/cart/query',
		method: 'get',
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

export function apiClearCart(){
	return request({
		url: '/wx/cart/clear',
		method: 'post',
	})
}