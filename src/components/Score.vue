<template>
  <div class="quiz-info score">
    <div class="score">Score {{ score }} / {{ totalQuestions }}</div>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.quiz-info.score .quiz-info.question {
  color: #000000;
  font-size: 1.25rem;
}

.score {
  color: #000000;
  font-size: 1.1rem;
}
</style>
