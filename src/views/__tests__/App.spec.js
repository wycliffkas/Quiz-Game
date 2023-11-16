import { mount } from "@vue/test-utils";
import App from "@/views/App.vue";

describe("App View", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(App);
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("Displays the 'Finish' button on the last question", async () => {
		const wrapper = mount(App);
		await wrapper.setData({ currentQuestion: 4 });
		expect(wrapper.text()).toContain("Finish");
	});

	it("Resets the quiz", () => {
		wrapper.vm.setAnswer(0);
		wrapper.vm.setAnswer(1);

		wrapper.vm.resetQuiz();

		expect(wrapper.vm.questions.every((q) => q.selected === null)).toBe(true);

		expect(wrapper.vm.currentQuestion).toBe(0);

		expect(wrapper.vm.endOfQuiz).toBe(false);
	});

	it("Sets the answer for the current question", () => {
		wrapper.vm.setAnswer(2);

		expect(wrapper.vm.questions[wrapper.vm.currentQuestion].selected).toBe(2);
	});

	it("Advances to the next question", () => {
		wrapper.vm.setAnswer(1);

		wrapper.vm.nextQuestion();

		expect(wrapper.vm.currentQuestion).toBe(1);

		expect(wrapper.vm.endOfQuiz).toBe(false);
	});

	it("Advances to the end of the quiz", () => {
		for (let i = 0; i < wrapper.vm.questions.length; i++) {
			wrapper.vm.setAnswer(0);
			wrapper.vm.nextQuestion();
		}

		expect(wrapper.vm.endOfQuiz).toBe(true);
	});

	it("Calculates the score correctly", () => {
		for (let i = 0; i < wrapper.vm.questions.length; i++) {
			wrapper.vm.setAnswer(wrapper.vm.questions[i].answer);
			wrapper.vm.nextQuestion();
		}

		expect(wrapper.vm.score).toBe(wrapper.vm.questions.length);
	});

	it("Calculates the percentile correctly", () => {
		for (let i = 0; i < wrapper.vm.questions.length; i++) {
			wrapper.vm.setAnswer(wrapper.vm.questions[i].answer);
			wrapper.vm.nextQuestion();
		}

		const expectedPercentile =
			(wrapper.vm.questions.length / wrapper.vm.questions.length) * 100;

		expect(parseFloat(wrapper.vm.percentile)).toBe(expectedPercentile);
	});

	it("returns the current question with index", () => {
		const currentQuestion = wrapper.vm.getCurrentQuestion;
		expect(currentQuestion).toEqual({
			answer: 1,
			choosen: null,
			index: 0,
			options: [
				"Charles Dickens",
				"William Shakespeare",
				"Jane Austen",
				"Mark Twain"
			],
			question: "Who wrote Romeo and Juliet?"
		});
	});

	it("calculates the score correctly", () => {
		for (let i = 0; i < wrapper.vm.questions.length; i++) {
			wrapper.vm.setAnswer(wrapper.vm.questions[i].answer);
			wrapper.vm.nextQuestion();
		}

		expect(wrapper.vm.score).toBe(wrapper.vm.questions.length);
	});

	it("checks if any option is selected", () => {
		wrapper.vm.setAnswer(1);

		expect(wrapper.vm.isAnyOptionSelected).toBe(true);

		wrapper.vm.resetQuiz();
		expect(wrapper.vm.isAnyOptionSelected).toBe(false);
	});
});
