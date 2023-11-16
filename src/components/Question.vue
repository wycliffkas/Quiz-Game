
<template>
  <div class="quiz-info">
    <div class="question">{{ question }}</div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.quiz-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.question {
  color: #fff;
  font-size: 1.25rem;
}
</style>
