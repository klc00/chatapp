<template>
    <div style="background-color: #e1e1e1;height: 100vh;">
        <CustomHeader />
        <div class=" px-5">
            <div class="card" id="chat3" style="border-radius: 15px;">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                            <div class="p-3">
                                <p>Online Users</p>
                                <FriendBox @selectedUser="selectedUser" />
                            </div>
                        </div>
                        <div class="col-md-6 col-lg-7 col-xl-8">
                            <MessageBox />
                            <SendBar @sendMessage="sendMessage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CustomHeader from '@/components/playground/CustomHeader.vue';
import { SocketService } from '@/services/socket.service';
import store from '@/store';
import { UserActions } from '@/store/user/actions';
import { UserInterface } from '@/entities/interfaces/user.interface';
import FriendBox from '@/components/playground/FriendBox.vue';
import MessageBox from '@/components/playground/MessageBox.vue';
import SendBar from '@/components/playground/SendBar.vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'PlaygroundView',
    components: {
        FriendBox,
        MessageBox,
        SendBar,
        CustomHeader
    },
    data() {
        return {
            socket: new SocketService(),
        }
    },
    created() {
        this.socket.listen();
        this.socket.connect();
        store.dispatch(UserActions.PROFILE);
    },
    unmounted() {
        this.socket.disConnect();
    },
    setup() {
        const store = useStore();
        const selectUser = ref(store.getters.getSelectUser);
        const getPhoto = ref(store.getters.getPhoto);
        const getNickname = ref(store.getters.getNickname);
        const getId = ref(store.state.id);

        return {
            selectUser,
            getPhoto,
            getNickname,
            getId,
        }
    },
    methods: {
        selectedUser(user: UserInterface) {
            store.commit("selectChatUser", user);
            this.socket.getMessage(user.id as number);
        },
        sendMessage(text: string) {
            this.socket.createMessage({
                recipientId: store.getters.getSelectUser.id,
                text,
            })
            /*  const newMessage: MessageInterface = {
                  id: Math.random(),
                  text, recipientId: this.selectUser.id, createdAt: new Date(), creatorId: store.getters.getId,
              }
              store.commit("addMessage", newMessage);*/
        }
    },

});
</script>

<style>
.welcome {}
</style>