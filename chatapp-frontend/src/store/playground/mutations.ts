import { ConnectedUserInterface } from "@/entities/interfaces/connected-user.interface";
import { MessageInterface } from "@/entities/interfaces/message.interface";
import { UserInterface } from "@/entities/interfaces/user.interface";
import { MutationTree } from "vuex";
import { PlaygroundState } from "./types";

export enum PlaygroundMutations {

}

export const mutations: MutationTree<PlaygroundState> = {
    onlineUserAll(state, payload: ConnectedUserInterface[]) {
        state.onlineUsers = payload;
    },
    selectChatUser(state, payload: UserInterface) {
        state.selectUser = payload;
    },
    messageList(state, payload: MessageInterface[]) {
        state.tempMessages = payload;
    },
    addMessage(state, payload: MessageInterface) {
        state.tempMessages.push(payload);
    },
    newMessage(state, payload: MessageInterface) {
        if (payload.creatorId == state.selectUser?.id || payload.recipientId == state.selectUser?.id) {
            state.tempMessages = [...state.tempMessages, payload];
        }
    }
};