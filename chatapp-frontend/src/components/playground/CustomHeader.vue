<template>
    <div class="d-flex justify-content-between px-5 py-5">
        <div class="d-flex flex-row">
            <img v-bind:src="photo" alt="avatar" class="d-flex align-self-center" width="60">
            <span class="badge bg-success badge-dot"></span>

            <div>
                <p class="fw-bold mb-0" v-text="nickname"></p>
            </div>
        </div>
        <div>
            <h2>Chatapp</h2>
        </div>
        <div>
            <i @click="exit" class="bi bi-box-arrow-right fs-1"></i>
        </div>
    </div>
</template>

<script lang="ts">
import router from '@/router';
import store from '@/store';
import { UserActions } from '@/store/user/actions';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';


export default defineComponent({
    data() {
        return {
            photo: "",
            nickname: "",
        }
    },
    created() {
        const store = useStore();
        store.watch((state, getters) => getters.getPhoto, (newVal, oldVal) => {
            if (newVal != undefined) {
                this.photo = newVal
            }
        });
        store.watch((state, getters) => getters.getNickname, (newVal, oldVal) => {
            if (newVal != undefined) {
                this.nickname = newVal
            }
        });
       
    },

    methods: {
        exit() {
            store.dispatch(UserActions.LOGOUT).then(() => {
                router.push("/");
            });
        }
    },
});
</script>

<style></style>