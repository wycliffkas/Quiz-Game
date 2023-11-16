import { mount } from "@vue/test-utils";
import Question from "../Question.vue";

describe("Question component", () => {
	it("renders the question prop correctly", () => {
		const question = "What is the capital of France?";
		const wrapper = mount(Question, {
			propsData: { question, index: 1 }
		});

		expect(wrapper.text()).toContain(question);
	});

	it("applies the correct styles", () => {
		const wrapper = mount(Question, {
			propsData: { question: "Sample question", index: 1 }
		});

		const quizInfoElement = wrapper.find(".quiz-info");
		expect(quizInfoElement.classes("quiz-info")).toBe(true);

		const questionElement = wrapper.find(".question");
		expect(questionElement.classes("question")).toBe(true);
	});
});
