import { GetterTree } from "vuex";
import { RootState } from "../types";
import { UserState } from "./types";

export const getters: GetterTree<UserState, RootState> = {
    loggedIn(state) {
        if (state.loggedIn == true) {
            return true;
        }
        return false;
    },
    getPhoto(state) {
        return state.photo;
    },
    getNickname(state) {
        return state.nickname;
    },
    getId(state) {
        return state.id;
    }
};