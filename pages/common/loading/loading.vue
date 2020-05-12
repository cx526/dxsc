<template>
	<view>
		<!-- <image src="/static/images/loading01.jpg" class="loading"></image> -->
		<image :src="$src+'/images/loading.gif'" class="loading"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				$src: this.$src
			}
		}
	}
</script>

<style>
	.loading {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
</style>
