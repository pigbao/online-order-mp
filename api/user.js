import request from '@/utils/request'

export function apiAvatar(avatar) {
	return request({
		url: '/wx/user/update',
		method: 'post',
		data: {
			avatar
		}
	})
}

export function apiNickName(nickName) {
	return request({
		url: '/wx/user/update',
		method: 'post',
		data: {
			nickName
		}
	})
}