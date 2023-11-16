<template>
	<main class="app" :style="parallaxStyle" ref="appContainer">
		<h1>Quiz</h1>

		<section class="quiz" v-if="!endOfQuiz">
			<div class="wrapper">
				<Question
					:question="getCurrentQuestion.question"
					:index="getCurrentQuestion.index"></Question>

				<Score :score="score" :totalQuestions="questions.length"></Score>
			</div>
			<Options
				:options="getCurrentQuestion.options"
				:selected="getCurrentQuestion.selected"
				:answer="getCurrentQuestion.answer"
				:questionIndex="getCurrentQuestion.index"
				@selectOption="setAnswer"></Options>

			<Button @handleClick="nextQuestion" :disabled="!isAnyOptionSelected">
				{{
					getCurrentQuestion.index == questions.length - 1 ? "Finish" : "Next"
				}}
			</Button>
		</section>

		<section v-else class="center-content">
			<h2>You have finished the quiz!</h2>
			<p>
				Your score is <strong>{{ score }} / {{ questions.length }}</strong>
			</p>
			<p>
				You performed better than <strong>{{ percentile }}% </strong> of all
				quiz-takers.
			</p>
			<Button @handleClick="resetQuiz">Play Again</Button>
		</section>
	</main>
</template>

<script>
import { ref } from "vue";

import Question from "../components/Question.vue";
import Score from "../components/Score.vue";
import Options from "../components/Options.vue";
import Button from "../components/Button.vue";

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
			appContainer: ref(null),
			mouseX: 0,
			mouseY: 0
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
			return betterThanPercentage.toFixed(2);
		},
		isAnyOptionSelected() {
			return this.getCurrentQuestion.selected != null;
		},
		parallaxStyle() {
			return {
				backgroundPosition: `calc(50% + ${this.mouseX * 50}px) calc(50% + ${
					this.mouseY * 50
				}px)`
			};
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
		},
		handleMouseMove(event) {
			this.mouseX = event.clientX / window.innerWidth - 0.5;
			this.mouseY = event.clientY / window.innerHeight - 0.5;
		}
	},
	mounted() {
		this.$refs.appContainer?.addEventListener(
			"mousemove",
			this.handleMouseMove
		);
	},
	beforeUnmount() {
		this.$refs.appContainer?.removeEventListener(
			"mousemove",
			this.handleMouseMove
		);
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
	justify-content: center;
	padding: 2rem;
	height: 100vh;
	position: relative;
	overflow: hidden;
	background-image: url("../assets/background-image.jpg");
	background-size: cover;
	color: #000000;
}

body {
	background-color: #fff;
	color: #000000;
}

h1 {
	font-size: 2rem;
	margin-bottom: 2rem;
}

.quiz {
	background-color: #fff;
	padding: 1rem;
	width: 100%;
	max-width: 640px;
	border-radius: 5px;
}

.quiz-info {
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;
}

.quiz-info.score .quiz-info.question {
	color: #ffffff;
	font-size: 1.25rem;
}

h2 {
	margin-bottom: 2rem;
	text-align: center;
	font-size: 1.3rem;
}

p {
	color: #000000;
	font-size: 1.3rem;
	text-align: center;
	margin-bottom: 2rem;
}

.center-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;

  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
  }

}
</style>
