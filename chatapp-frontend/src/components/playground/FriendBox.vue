<template>
    <div style="position: relative; height: 600px" class="overflow-auto">
        <ul class="list-unstyled mb-0" v-for="user in onlineUsers" v-bind:key="user.user?.id">
            <li v-if="user.user?.id != id" class="p-2 border-bottom" @click="$emit('selectedUser', user.user)">
                <a class="d-flex justify-content-between">
                    <div class="d-flex flex-row">
                        <div>
                            <img v-bind:src="user.user?.photo" alt="avatar" class="d-flex align-self-center me-3"
                                width="60">
                            <span class="badge bg-success badge-dot"></span>
                        </div>
                        <div class="pt-1">
                            <p class="fw-bold mb-0" v-text="user.user?.nickname"></p>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { ConnectedUserInterface } from '@/entities/interfaces/connected-user.interface';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({

    data() {
        return {
            onlineUsers: [] as ConnectedUserInterface[],
            id: 0,
        }
    },
    created() {
        const store = useStore();
        store.watch((state, getters) => getters.getOnlineUsers, (newVal, oldVal) => {
            if (newVal != undefined) {
                this.onlineUsers = newVal
            }
        });
        store.watch((state, getters) => getters.getId, (newVal, oldVal) => {
            if (newVal != undefined) {
                this.id = newVal
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