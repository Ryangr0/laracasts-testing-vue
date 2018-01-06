import { mount } from 'vue-test-utils';
import Reminders from '../src/components/Reminders.vue';
import expect from 'expect';

describe('Reminders', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Reminders);
    });

    it('hides the reminders list if there are no items in it', () => {
        expect(wrapper.contains('ul')).toBe(false);
    });

    it('shows the reminders list if there are items in it', () => {
        wrapper.setData({ reminders: ['Go to the store'] });
        expect(wrapper.contains('ul'))
    });

    it('can add items to the list', () => {
        addReminder('Go to the store');

        expect(wrapper.vm.reminders).toEqual(['Go to the store']);
        expect(wrapper.find('ul').text()).toContain('Go to the store');
    });

    it('empties the input field after entering a new item', () => {
        addReminder('Go to the store');
        expect(wrapper.find('.new-reminder').element.value).toBe('');
    });

    it('can remove any reminder', () => {
        wrapper.setData({
            reminders: ['Go to the store', 'Finish homework']
        });

        let removeButton = wrapper.find('ul > li:first-child > .removeReminder');
        removeButton.trigger('click');

        expect(wrapper.vm.reminders).not.toContain(['Go to the store']);
        expect(wrapper.find('ul').text()).not.toContain('Go to the store');
    });

    function addReminder(body) {
        let newReminder = wrapper.find('.new-reminder');
        newReminder.element.value = body;
        newReminder.trigger('input');

        wrapper.find('.addReminder').trigger('click');
    }
});