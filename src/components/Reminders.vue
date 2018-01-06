<template>
    <div>
        <input type="text" class="new-reminder" v-model="newReminder"/>
        <button class="addReminder" @click="add" :key="reminder" v-text="reminder"></button>

        <ul v-if="reminders.length > 0">
            <li v-for="reminder in reminders">
                {{reminder}}

                <button class="removeReminder" @click="remove(reminder)"></button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                newReminder: '',
                reminders: []
            }
        },
        methods: {
            add () {
                this.reminders.push(this.newReminder);
                this.newReminder = '';
            },

            remove(key) {
                this.reminders.splice(key, 1);
            }
        }
    }
</script>
