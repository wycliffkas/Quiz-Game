<template>
	<div class="options">
		<label
			v-for="(option, index) in options"
			:key="index"
			:class="getOptionClass(index)">
			<input
				type="radio"
				:name="`question-${questionIndex}`"
				:value="index"
				:checked="selected === index"
				@change="handleOptionChange(index)"
				:disabled="selected !== null && index !== selected" />
			<span>{{ option }}</span>
		</label>
	</div>
</template>

<script>
export default {
	props: {
		options: {
			type: Array,
			required: true
		},
		selected: {
			type: Number,
			default: null
		},
		answer: {
			type: Number,
			required: true
		},
		questionIndex: {
			type: Number,
			required: true
		}
	},
	methods: {
		handleOptionChange(index) {
			this.$emit("selectOption", index);
		},
		getOptionClass(index) {
			const isSelected = this.selected === index;
			const isCorrect = isSelected && index === this.answer;
			const isDisabled = this.selected !== null && index !== this.selected;

			return `option ${isSelected ? (isCorrect ? "correct" : "wrong") : ""} ${
				isDisabled ? "disabled" : ""
			}`;
		}
	}
};
</script>

<style lang="less" scoped>
.options {
	margin-bottom: 1rem;
}

.option {
	padding: 1rem;
	display: block;
	background-color: #fff;
	margin-bottom: 0.5rem;
	border-radius: 0.5rem;
  border: 1px solid #000000;
	cursor: pointer;
  color: #000;

	&:hover {
		background-color: rgb(74, 73, 73);
    color: #fff;
	}

	&.correct {
		background-color: #2cce7d;
	}

	&.wrong {
		background-color: #ff5a5f;
	}

	&:last-of-type {
		margin-bottom: 0;
	}

	&.disabled {
		opacity: 0.5;
	}

	input {
		display: none;
	}
}
</style>
