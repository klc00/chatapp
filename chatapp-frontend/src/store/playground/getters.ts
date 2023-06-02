import { GetterTree } from "vuex";
import { RootState } from "../types";
import { PlaygroundState } from "./types";

export const getters: GetterTree<PlaygroundState, RootState> = {
    getOnlineUsers(state) {
        return state.onlineUsers;
    },
    getSelectUser(state) {
        return state.selectUser;
    },
    getMessages(state) {
        return state.tempMessages;
    },
};