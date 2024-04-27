import request from '@/utils/request'

export function apiQueryCateGoods(isTakeout) {
	return request({
		url: '/wx/goods/query',
		method: 'get',
		data: {
			isTakeout
		}
	})
}