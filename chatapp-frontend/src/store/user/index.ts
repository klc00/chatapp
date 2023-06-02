import { Module } from "vuex";
import { RootState } from "../types";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { UserState } from "./types";

const state: UserState = {
    access_token: undefined,
    email: undefined,
    expires_in: undefined,
    id: undefined,
    loggedIn: undefined,
    nickname: undefined,
    photo: undefined,
};

export const UserModule: Module<UserState, RootState> = {
    state,
    getters,
    mutations,
    actions,
}