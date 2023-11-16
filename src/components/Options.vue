<template>
  <div class="options">
    <label
      v-for="(option, index) in options"
      :key="index"
      :class="`option ${
        selected === index
          ? index === answer
            ? 'correct'
            : 'wrong'
          : ''
      } ${selected !== null && index !== selected ? 'disabled' : ''}`"
    >
      <input
        type="radio"
        :name="`question-${questionIndex}`"
        :value="index"
        :checked="selected === index"
        @change="handleOptionChange(index)"
      />
      <span>{{ option }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
    selected: {
      type: Number, // Ensure selected is of type Number
      default: null,
    },
    answer: {
      type: Number,
      required: true,
    },
    questionIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleOptionChange(index) {
      this.$emit('selectOption', index);
    },
  },
};
</script>

<style lang="less" scoped>
.options {
  margin-bottom: 1rem;
}

.option {
  padding: 1rem;
  display: block;
  background-color: #271c36;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #2d213f;
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
