import { mount } from "@vue/test-utils";
import MyButton from "../Button.vue";

describe("Button component", () => {
  it("renders button text when passed", () => {
    const buttonText = "Click me";
    const wrapper = mount(MyButton, {
      slots: {
        default: buttonText
      }
    });
    expect(wrapper.text()).toMatch(buttonText);
  });

  it('emits "handleClick" event when button is clicked', async () => {
    const wrapper = mount(MyButton);
    await wrapper.trigger("click");
    expect(wrapper.emitted().handleClick).toBeTruthy();
  });


  it('does not emit "handleClick" event when button is clicked and isDisabled is true', async () => {
    const wrapper = mount(MyButton, {
      props: {
        isDisabled: true
      }
    });
    await wrapper.trigger("click");
    expect(wrapper.emitted().handleClick).toBeFalsy();
  });

});
