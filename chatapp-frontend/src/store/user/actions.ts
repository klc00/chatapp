import { LoginRequestInterface } from "@/entities/request/login.request.interface";
import { LoginResponseInterface } from "@/entities/response/login.response.interface";
import { PasswordResetRequestInterface } from "@/entities/request/password-reset.request.interface";
import { PasswordResetResponseInterface } from "@/entities/response/password-reset.response.interface";
import { ProfileResponseInterface } from "@/entities/response/profile.response.interface";
import { RegisterRequestInterface } from "@/entities/request/register.request.interface";
import { RegisterResponseInterface } from "@/entities/response/register.response.interface";
import { ResultInterface } from "@/entities/interfaces/result.interface";
import UserService from "@/services/user.service";
import { ActionTree } from "vuex";
import { RootState } from "../types";
import { UserState } from "./types";

export enum UserActions {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
    PASSWORDRESET = "PASSWORDRESET",
    LOGOUT = "LOGOUT",
    PROFILE = "PROFILE",
}

export const actions: ActionTree<UserState, RootState> = {
    [UserActions.REGISTER]: async ({ commit }, registerRequest: RegisterRequestInterface): Promise<ResultInterface<RegisterResponseInterface>> => {
        return UserService.register(registerRequest).then(
            response => {
                commit('registerSuccess');
                return Promise.resolve(response);
            },
            error => {
                commit('registerFailure');
                return Promise.reject(error);
            }
        );
    },
    [UserActions.LOGIN]: async ({ commit }, loginRequest: LoginRequestInterface): Promise<ResultInterface<LoginResponseInterface>> => {
        return UserService.login(loginRequest)
            .then(response => {
                commit('loginSuccess', response.data);
                return Promise.resolve(response);
            }).catch(error => {
                commit('loginFailure');
                return Promise.reject(error);
            });
    },
    [UserActions.PASSWORDRESET]: async ({ commit }, passwordResetRequest: PasswordResetRequestInterface): Promise<ResultInterface<PasswordResetResponseInterface>> => {
        return UserService.passwordReset(passwordResetRequest).then(
            response => {
                commit('passwordReset');
                return Promise.resolve(response);
            },
            error => {
                commit('registerFailure');
                return Promise.reject(error);
            }
        );
    },
    [UserActions.LOGOUT]: ({ commit }) => {
        UserService.logout();
        commit('logout');
    },
    [UserActions.PROFILE]: async ({ commit }): Promise<ResultInterface<ProfileResponseInterface>> => {
        return UserService.getProfile().then(
            response => {
                commit('setProfile', response.data);
                return Promise.resolve(response);
            },
            error => {
                commit('clearProfile');
                return Promise.reject(error);
            }
        );
    },
};