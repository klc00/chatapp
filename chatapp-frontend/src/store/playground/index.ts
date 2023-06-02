import { Module } from "vuex";
import { RootState } from "../types";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { PlaygroundState } from "./types";

const state: PlaygroundState = {
    onlineUsers: [],
    tempMessages: [],
    selectUser: null,
};

export const PlaygroundModule: Module<PlaygroundState, RootState> = {
    state,
    getters,
    mutations,
    actions,
}