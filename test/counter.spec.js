import { mount } from 'vue-test-utils';
import Counter from '../src/components/Counter.vue';
import expect from 'expect';

describe('Counter', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Counter);
    });

    it('defaults to a count of 0', () => {
        expect(wrapper.vm.count).toBe(0);
    });

    it('increments the count when the increment button is clicked', () => {
        wrapper.find('.increment').trigger('click');
        expect(wrapper.vm.count).toBe(1);
    });

    it('decrements the count when the decrement button is clicked', () => {
        wrapper.setData({ count: 5 });

        wrapper.find('.decrement').trigger('click');
        expect(wrapper.vm.count).toBe(4);
    });

    it('cannot be decreased to less than zero', () => {
        // Check if the buton is hidden
        expect(wrapper.vm.count).toBe(0);
        expect(wrapper.find('.decrement').hasStyle('display', 'none')).toBe(true);

        // Check if even if the decrement button's click event is programatically triggeren, that it doesn't do this
        wrapper.find('.decrement').trigger('click');
        expect(wrapper.vm.count).toBe(0);

        // Check if button reappears if the count is set to a number higher than 0
        wrapper.setData({ count: 4 });
        expect(wrapper.find('.decrement').hasStyle('display', 'none')).toBe(false);
    });

    it('presents the current count', () => {
        expect(wrapper.find('.count').html()).toContain(0);
        wrapper.find('button').trigger('click');
        expect(wrapper.find('.count').html()).toContain(1);
    });
});