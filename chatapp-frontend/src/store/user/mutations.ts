import { LoginResponseInterface } from "@/entities/response/login.response.interface";
import { ProfileResponseInterface } from "@/entities/response/profile.response.interface";
import { MutationTree } from "vuex";
import { UserState } from "./types";

export enum UserMutations {
    //SET_EMAIL = "SET_EMAIL",
}

export const mutations: MutationTree<UserState> = {
    /* [UserMutations.SET_EMAIL](state, payload: string): void {
         state.email = payload;
     },*/
    loginSuccess(state, loginResponse: LoginResponseInterface) {
        state.loggedIn = true;
        state.access_token = loginResponse.access_token;
        state.expires_in = loginResponse.expires_in;
    },
    loginFailure(state) {
        state.loggedIn = false;
    },
    logout(state) {
        state.loggedIn = false;
        state.access_token = undefined;
        state.expires_in = undefined;
    },
    registerSuccess(state) {
        state.loggedIn = false;
    },
    registerFailure(state) {
        state.loggedIn = false;
    },
    setProfile(state, profile: ProfileResponseInterface) {
        //state.loggedIn = false;

        state.id = profile.id;
        state.email = profile.email;
        state.nickname = profile.nickname;
        state.photo = profile.photo;
    },
    clearProfile(state) {
        state.id = undefined;
        state.email = undefined;
        state.nickname = undefined;
        state.photo = undefined;
    }
};