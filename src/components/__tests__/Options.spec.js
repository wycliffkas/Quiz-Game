import { mount } from "@vue/test-utils";
import Options from "../Options.vue";

describe("Options component", () => {
  it("renders options correctly", () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const wrapper = mount(Options, {
      propsData: { options, selected: null, answer: 1, questionIndex: 0 }
    });

    const optionElements = wrapper.findAll(".option");
    expect(optionElements.length).toBe(options.length);

    options.forEach((option, index) => {
      expect(optionElements[index].text()).toContain(option);
    });
  });

  it("emits 'selectOption' event on option change", async () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const wrapper = mount(Options, {
      propsData: { options, selected: null, answer: 1, questionIndex: 0 }
    });

    await wrapper.find("input[type='radio']").trigger("change");
    expect(wrapper.emitted().selectOption).toBeTruthy();
  });


  it("applies correct styles for disabled options", async () => {
    const options = ["Option 1", "Option 2", "Option 3"];
    const wrapper = mount(Options, {
      propsData: { options, selected: 1, answer: 1, questionIndex: 0 }
    });

    const disabledOption = wrapper.find(".option.disabled");
    expect(disabledOption.exists()).toBe(true);
  });
});
