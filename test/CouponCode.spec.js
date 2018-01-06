import { mount } from 'vue-test-utils';
import CouponCode from '../src/components/CouponCode.vue';
import expect from 'expect';

describe('CouponCode', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(CouponCode);

        wrapper.setData({
            couponCodes: [
                {
                    code: '50OFF',
                    message: '50% Off!',
                    discount: 50
                },
                {
                    code: 'FREE',
                    message: 'Entirely free!',
                    discount: 100
                }
            ]
        })
    });

    it('accepts a coupon code', () => {
        expect(wrapper.contains('input.coupon-code')).toBe(true);
    });

    it('validates a real coupon code', () => {
        enterCode('50OFF');
        expect(wrapper.find('p').text()).toContain('Coupon redeemed: 50% Off!');
    });

    it('validates a fake coupon code', () => {
        enterCode('FAKECODE');
        expect(wrapper.find('p').text()).toBe('Invalid coupon code');
    });

    it('broadcasts the percentage discount when a valid coupon code is applied', () => {
        enterCode('FREE');
        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([100]);
    });

    function enterCode(code) {
        let couponCode = wrapper.find('input.coupon-code');
        couponCode.element.value = code;
        couponCode.trigger('input');
    }
});