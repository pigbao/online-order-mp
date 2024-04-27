<script>
	export default {
		onLaunch: function() {
			uni.login({
				provider: 'weixin', //使用微信登录
				success: function(loginRes) {
					console.log(loginRes?.code);

				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
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