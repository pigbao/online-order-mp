function request({
	data,
	method,
	url
}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: 'http://192.168.0.104:7001' + url, //仅为示例，并非真实接口地址。
			data,
			method,
			header: {
				'custom-header': 'hello' //自定义请求头信息
			},
			success: (res) => {
				resolve(res?.data?.data)
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}

export default request