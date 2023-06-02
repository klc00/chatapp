<template>
    <div class="pt-3 pe-3 overflow-auto" style="position: relative; height: 600px">
        <div v-for="message in messages" v-bind:key="message.id">
            <div v-if="message?.creatorId != id" if class="d-flex flex-row justify-content-start">
                <img v-bind:src="photo" alt="avatar 1" style="width: 45px; height: 100%;">
                <div>
                    <p class="small p-2 ms-3 mb-1 rounded-3" style="background-color: #f5f6f7;" v-text="message.text"></p>
                    <p class="small ms-3 mb-3 rounded-3 text-muted float-end" v-text="message.createdAt">
                    </p>
                </div>
            </div>
            <div v-else class="d-flex flex-row justify-content-end">
                <div>
                    <p class="small p-2 me-3 mb-1 text-white rounded-3 bg-primary" v-text="message.text">
                    </p>
                    <p class="small me-3 mb-3 rounded-3 text-muted" v-text="message.createdAt"></p>
                </div>
                <img v-bind:src="toPhoto" alt="avatar 1" style="width: 45px; height: 100%;">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { MessageInterface } from '@/entities/interfaces/message.interface';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    data() {
        return {
            messages: [] as MessageInterface[],
            id: 0,
            photo: "",
            toPhoto: "",
        }
    },
    created() {
        const store = useStore();
        store.watch((state, getters) => getters.getMessages, (newVal, oldVal) => {
            if (newVal != undefined) {
                this.messages = newVal
            }
        });
        store.watch((state, getters) => getters.getId, (newVal, oldVal) => {
            if (newVal != undefined) {
                this.id = newVal
            }
        });
        store.watch((state, getters) => getters.getPhoto, (newVal, oldVal) => {
            if (newVal != undefined) {
                this.photo = newVal
            }
        });
        store.watch((state, getters) => getters.getSelectUser, (newVal, oldVal) => {
            if (newVal != undefined) {
                this.toPhoto = newVal.photo
            }
        });
    },

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