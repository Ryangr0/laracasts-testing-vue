<template>
    <div>
        <input type="text" class="coupon-code" v-model="code" @input="validate">
        <p v-text="feedback"></p>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                code: '',
                couponCodes: [
                    {
                        code: '10OFF',
                        message: '10% Off!',
                        discount: 10
                    },
                    {
                        code: 'NOVAT',
                        message: 'No VAT!',
                        discount: 21
                    }
                ],
                valid: false
            }
        },
        computed: {
            selectedCoupon() {
                return this.couponCodes.find(coupon => coupon.code === this.code)
            },
            feedback() {
                if (this.valid) {
                    return 'Coupon redeemed: ' + this.selectedCoupon.message
                }

                return 'Invalid coupon code';
            }
        },
        methods: {
            validate() {
                this.valid = !! this.selectedCoupon;
                if (this.valid) {
                    this.$emit('applied', this.selectedCoupon.discount);
                }
            }
        }
    }
</script>