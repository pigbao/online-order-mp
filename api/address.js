import request from '@/utils/request'

export function apiAdd(data) {
	return request({
		url: '/wx/address/add',
		method: 'post',
    data
	})
}

export function apiUpdate(data) {
	return request({
		url: '/wx/address/update',
		method: 'post',
		data
	})
}

export function apiQuery() {
	return request({
		url: '/wx/address/query',
		method: 'get',
	})
}


export function apiDetail(id) {
	return request({
		url: '/wx/address/detail',
		method: 'get',
		data:{
			id
		}
	})
}

export function apiDel(id){
	return request({
		url: '/wx/address/del',
		method: 'post',
		data: {
			id
		}
	})
}
