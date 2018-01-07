import {mount} from 'vue-test-utils';
import expect from 'expect';
import Countdown from '../src/components/Countdown.vue';
import moment from 'moment';
import sinon from 'sinon';

describe('Countdown', () => {
    let wrapper, clock;
    beforeEach(() => {
        clock = sinon.useFakeTimers();
        wrapper = mount(Countdown, {
            propsData: { until: moment().add(10, 'seconds') }
        });
    });

    afterEach(() => {
        clock.restore();
    });

    it('should render a countdown timer', () => {
        see('0 Days');
        see('0 Hours');
        see('0 Minutes');
        see('10 Seconds');
    });

    it('should reduce by one second, every second', function (done) {

        see('10 Seconds');

        clock.tick(1000);

        assertOnNextTick(() => {
            see('9 Seconds');
        }, done);
    });

    it('should expire with custom text after reaching 0 seconds', (done) => {
        wrapper.setProps({ expiredText: 'Contest is over!' });

        see('10 Seconds');

        clock.tick(10000);

        assertOnNextTick(() => {
            see('Contest is over!');
        }, done);
    });

    it('should broadcast when the countdown is finished', (done) => {
        clock.tick(10000);

        assertOnNextTick(() => {
            expectEvent('finished');
        }, done);
    });

    it('should clear the interval after countdown is finished', function (done) {

        clock.tick(10000);
        expect(wrapper.vm.now.getSeconds()).toBe(10);

        assertOnNextTick(() => {
            clock.tick(10000);
            expect(wrapper.vm.now.getSeconds()).toBe(10);
        }, done);
    });

    let assertOnNextTick = (callback, done) => {
        wrapper.vm.$nextTick(() => {
            try {
                callback();
                done();
            } catch (e) {
                done(e);
            }
        });
    };

    let expectEvent = (event) => {
        expect(wrapper.emitted()[event]).toBeTruthy();
    };

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