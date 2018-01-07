import { mount } from 'vue-test-utils';
import expect from 'expect';
import Question from '../src/components/Question.vue';
import moxios from 'moxios';

describe('Question', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        });
        
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('presents the title and the body', () => {
        see('The title', 'h1');
        see('The body', '.body');
    });

    it('can be edited', () => {
        expect(wrapper.contains('input[name=title]')).toBe(false);
        wrapper.find('#edit').trigger('click');

        expect(wrapper.find('input[name=title]').element.value).toBe('The title');
        expect(wrapper.find('textarea[name=body]').element.value).toBe('The body');
    });

    it('should hide the edit button during edit mode', () => {
        click('button#edit');
        expect(wrapper.contains('button#edit')).toBe(false);
    });

    it('should update the question after being edited', (done) => {
        click('button#edit');

        type('input[name=title]', 'New title');
        type('textarea[name=body]', 'New body');

        moxios.stubRequest('questions/1',{
            status: 200,
            response: {
                title: 'New title',
                body: 'New body'
            }
        });

        click('button#update');

        moxios.wait(() => {
            expect(wrapper.vm.editing).toBe(false);
            see('New title', 'h1');
            see('New body', '.body');
            see('Your question has been updated!');
            done();
        })
    });

    it('should be able to cancel out of edit mode', function () {
        click('button#edit');

        type('input[name=title]', 'New title');
        type('textarea[name=body]', 'New body');

        click('button#cancel');

        see('The title', 'h1');
        see('The body', '.body');
    });

    let see = (string, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        return expect(wrap.html()).toContain(string);
    };

    let type = (selector, string) => {
        let wrap = wrapper.find(selector);
        wrap.element.value = string;
        wrap.trigger('input');
    };

    let click = selector => {
        return wrapper.find(selector).trigger('click');
    };
});