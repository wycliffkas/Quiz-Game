<template>
	<main class="app" ref="appContainer">
		<h1>The Quiz</h1>

		<section class="quiz" v-if="!endOfQuiz">
			<Question
				:question="getCurrentQuestion.question"
				:index="getCurrentQuestion.index"></Question>

			<Score :score="score" :totalQuestions="questions.length"></Score>

			<Options
				:options="getCurrentQuestion.options"
				:selected="getCurrentQuestion.selected"
				:answer="getCurrentQuestion.answer"
				:questionIndex="getCurrentQuestion.index"
				@selectOption="setAnswer"></Options>

			<Button
				@click="nextQuestion"
				:disabled="!isAnyOptionSelected"
				:buttonText="
					getCurrentQuestion.index == questions.length - 1 ? 'Finish' : 'Next'
				"></Button>
		</section>

		<section v-else class="center-content">
			<h2>You have finished the quiz!</h2>
			<p>Your score is {{ score }} / {{ questions.length }}</p>
			<p>You performed better than {{ percentile }}% of all quiz-takers.</p>
			<Button @click="resetQuiz" :buttonText='Play'></Button>
		</section>
	</main>
</template>

<script>
import { ref } from "vue";

import Question from "./components/Question.vue";
import Score from "./components/Score.vue";
import Options from "./components/Options.vue";
import Button from "./components/Button.vue";

export default {
	components: {
		Question,
		Score,
		Options,
		Button
	},
	data() {
		return {
			questions: [
				{
					question: "Who wrote Romeo and Juliet?",
					options: [
						"Charles Dickens",
						"William Shakespeare",
						"Jane Austen",
						"Mark Twain"
					],
					answer: 1,
					choosen: null
				},
				{
					question: "What is the largest ocean on Earth?",
					options: [
						"Atlantic Ocean",
						"Indian Ocean",
						"Southern Ocean",
						"Pacific Ocean"
					],
					answer: 3,
					choosen: null
				},
				{
					question: "What is the largest mammal in the world?",
					options: ["Blue whale", "Elephant", "Giraffe", "Gorilla"],
					answer: 0,
					choosen: null
				},
				{
					question: "Which planet is known as the Red Planet?",
					options: ["Venus", "Jupiter", "Mars", "Saturn"],
					answer: 2,
					choosen: null
				},
				{
					question: "What is the capital city of France?",
					options: ["London", "Berlin", "Rome", "Paris"],
					answer: 3,
					choosen: null
				}
			],
			endOfQuiz: false,
			currentQuestion: 0,
			appContainer: ref(null)
		};
	},
	computed: {
		score() {
			let count = 0;
			this.questions.forEach((question) => {
				if (question.selected != null && question.answer == question.selected) {
					count++;
				}
			});
			return count;
		},
		getCurrentQuestion() {
			let question = this.questions[this.currentQuestion];
			question.index = this.currentQuestion;
      console.log("question-->", question)
			return question;
		},
		percentile() {
			const userScore = this.score;
			const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
			scores.push(userScore);
			localStorage.setItem("quizScores", JSON.stringify(scores));

			const lessThanOrEqualUserScore = scores.filter(
				(s) => s <= userScore
			).length;
			const betterThanPercentage =
				(lessThanOrEqualUserScore / scores.length) * 100;
			return betterThanPercentage;
		},
		isAnyOptionSelected() {
			return this.getCurrentQuestion.selected != null;
		}
	},
	methods: {
		resetQuiz() {
			this.questions = this.questions.map((question) => {
				question.selected = null;
				return question;
			});
			this.endOfQuiz = false;
			this.currentQuestion = 0;
		},
		setAnswer(index) {
			this.questions[this.currentQuestion].selected = index;
		},
		nextQuestion() {
			if (this.currentQuestion < this.questions.length - 1) {
				this.currentQuestion++;
			} else {
				this.endOfQuiz = true;
			}
		}
	}
};
</script>

<style lang="less">
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: "Montserrat", sans-serif;
}

.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 2rem;
	height: 100vh;
	position: relative;
	overflow: hidden;
	background-image: url("./assets/background-image.jpg");
	background-size: cover;
	color: #fff;
}

body {
	background-color: #271c36;
	color: #fff;
}

h1 {
	font-size: 2rem;
	margin-bottom: 2rem;
}

.quiz {
	background-color: #382a4b;
	padding: 1rem;
	width: 100%;
	max-width: 640px;
}

.quiz-info {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
}

.quiz-info.score .quiz-info.question {
	color: #fff;
	font-size: 1.25rem;
}

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
	}
}

h2 {
	font-size: 2rem;
	margin-bottom: 2rem;
	text-align: center;
}

p {
	color: #8f8f8f;
	font-size: 1.5rem;
	text-align: center;
	margin-bottom: 2rem;
}

.center-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
</style>
