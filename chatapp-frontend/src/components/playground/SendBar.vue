<template>
    <div class="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp" alt="avatar 3"
            style="width: 40px; height: 100%;">
        <input type="text" class="form-control form-control-lg" id="exampleFormControlInput2" placeholder="Type message"
            v-model="text" ref="my_input">
        <a class="ms-3" href="#!" @click="send"><i class="bi bi-send fs-3 mx-3"></i></a>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            text: '',
        }
    },

    methods: {
        send() {
            this.$emit('sendMessage', this.text);
            this.text = "";
        }
    }
});
</script>

<style scoped>
#chat3 .form-control {
    border-color: transparent;
}

#chat3 .form-control:focus {
    border-color: transparent;
    box-shadow: inset 0px 0px 0px 1px transparent;
}

.badge-dot {
    border-radius: 50%;
    height: 10px;
    width: 10px;
    margin-left: 2.9rem;
    margin-top: -.75rem;
}
</style>