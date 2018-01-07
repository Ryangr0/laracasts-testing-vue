<template>
    <div>
        <div v-if="!finished">
            <span>{{ remaining.days() }} Days, </span>
            <span>{{ remaining.hours() }} Hours, </span>
            <span>{{ remaining.minutes() }} Minutes, </span>
            <span>{{ remaining.seconds() }} Seconds </span>
            left...
        </div>
        <div v-if="finished">
            <span v-text="expiredText"></span>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default {
        props: {
            until: null,
            expiredText: { default: 'Expired!' }
        },
        data () {
            return { now: new Date() }
        },
        computed: {
            finished() {
                if (this.remaining <= 0) {
                    this.$emit('finished', {});
                    return true;
                }

                return false;
            },
            remaining() {
                return moment.duration(Date.parse(this.until) - this.now);
            }
        },
        created () {
            let updateTime = setInterval(() => {
                this.now = new Date();
            }, 1000);

            this.$on('finished', () => {
                clearInterval(updateTime);
            });
        }
    }
</script>