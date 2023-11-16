import { mount } from "@vue/test-utils";
import Score from "../Score.vue";

describe("Score component", () => {
	it("renders the score and totalQuestions props correctly", () => {
		const score = 7;
		const totalQuestions = 10;
		const wrapper = mount(Score, {
			propsData: { score, totalQuestions }
		});

		const scoreText = `Score ${score} / ${totalQuestions}`;
		expect(wrapper.text()).toContain(scoreText);
	});

	it("applies the correct styles for the score", () => {
		const wrapper = mount(Score, {
			propsData: { score: 5, totalQuestions: 8 }
		});

		const scoreElement = wrapper.find(".score");
		expect(scoreElement.classes("score")).toBe(true);
	});

	it("applies the correct styles for the quiz-info", () => {
		const wrapper = mount(Score, {
			propsData: { score: 5, totalQuestions: 8 }
		});

		const quizInfoElement = wrapper.find(".quiz-info");
		expect(quizInfoElement.classes("quiz-info")).toBe(true);
		expect(quizInfoElement.classes("score")).toBe(true);
	});
});
