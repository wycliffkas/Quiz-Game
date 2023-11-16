<template>
  <button @click="$emit('click')" :disabled="isDisabled">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="less" scoped>
button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #2cce7d;
  color: #2d213f;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;
  float: right;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
