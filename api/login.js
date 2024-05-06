import request from '@/utils/request'

export function apiLogin(code) {
	return request({
		url: '/wx/login',
		method: 'post',
		data: {
			code
		}
	})
}