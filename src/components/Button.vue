<template>
	<button @click="handleClick" :disabled="isDisabled">
		<slot></slot>
	</button>
</template>

<script>
export default {
	props: {
		isDisabled: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		handleClick() {
			this.$emit("handleClick");
		}
	}
};
</script>

<style lang="less" scoped>
button {
	appearance: none;
	outline: none;
	border: none;
	cursor: pointer;
	padding: 0.5rem 3rem;
	background-color: #09aeea;
	color: #fff;
	text-transform: none;
	font-size: 1.2rem;
	border-radius: 0.5rem;
	float: right;
	z-index: 3;

	&:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	&:hover {
		background-color: #0393c8;
	}
}
</style>
