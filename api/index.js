import request from '@/utils/request'

export function apiBannerList() {
	return request({
		url: '/wx/banner/query',
		method: 'get',
	})
}