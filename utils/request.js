import { baseUrl } from "./env";
function request({
	data,
	method,
	url
}) {
	const userStore = useUserStore()
	const openId = userStore.userInfo.openId
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + url, //仅为示例，并非真实接口地址。
			data:{
				openId,
				...data
			},
			method,
			header: {
				'custom-header': 'hello' //自定义请求头信息
			},
			success: (res) => {
				if(res?.data.code==200){
					resolve(res?.data?.data)
				}else{
					reject(res?.data?.msg)
				}
			},
			fail: (err) => {
				reject(err)
			}
		});
	})
}

export default request