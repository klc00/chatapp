<template>
    <div style="background-color: #e1e1e1;height: 100vh;">
        <br />
        <br />
        <h1 class="display-5">Chatapp Welcome</h1>
        <br />
        <br />
        <div v-if="defaultTab == 0">
            <SigninForm :change-tab-func="changeTab" />
        </div>
        <div v-if="defaultTab == 1">
            <SignupForm :change-tab-func="changeTab" />
        </div>
        <div v-if="defaultTab == 2">
            <PasswordReset :change-tab-func="changeTab" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SignupForm from '@/components/main/SignupForm.vue';
import SigninForm from '@/components/main/SigninForm.vue';
import PasswordReset from '@/components/main/PasswordResetForm.vue';

export default defineComponent({
    name: 'MainView',
    components: {
        SigninForm,
        SignupForm,
        PasswordReset,
    },
    data() {
        return {
            defaultTab: 0,
        }
    },
    methods: {
        changeTab(newTab: number) {
            this.defaultTab = newTab;
        }
    }
});
</script>

<style>
</style>