<script setup>
import { apiLogin } from '@/api/login.js';
import { useUserStore } from '@/stores/user.js';
const userStore = useUserStore()
onLaunch(() => {
	uni.login({
		provider: 'weixin', //使用微信登录
		success: async function(loginRes) {
			const res = await apiLogin(loginRes?.code);
			const { setUserInfo } = userStore
			setUserInfo(res)
		},
		fail: function(err) {
			console.log(err);
		}
	});
})

</script>

<style>
/*每个页面公共css */
page {
	background-color: #f1f5f9;
	color: #3f3f46;
}

::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}

button::after {
	border: initial;
}
</style>