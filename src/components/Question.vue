<template>
    <div>
        <!-- Viewing the question -->
        <div v-if="!editing">
            <h1 v-text="question.title"></h1>
            <div class="body" v-text="question.body"></div>
            <button id="edit" @click="editing = !editing">Edit</button>
        </div>

        <!-- Editing the question -->
        <div v-if="editing">
            <input type="text" name="title" v-model="form.title">
            <textarea name="body" v-model="form.body"></textarea>

            <button id="update" @click="update">Update</button>
            <button id="cancel" @click="cancel">Cancel</button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['dataQuestion'],
        data() {
            return {
                question: this.dataQuestion,
                form: {
                    title: this.dataQuestion.title,
                    body: this.dataQuestion.body
                },
                editing: false
            }
        },
        methods: {
            update() {
                this.question = this.form;
                this.editing = false;
            },
            cancel() {
                this.editing = false;
            }
        }
    }
</script>