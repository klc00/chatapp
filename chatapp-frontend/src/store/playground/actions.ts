import { ActionTree } from "vuex";
import { RootState } from "../types";
import { PlaygroundState } from "./types";

export enum PlaygroundActions {
    LOAD_API_RESULT = "LOAD_API_RESULT",
    LOAD_API_RESULT_2 = "LOAD_API_RESULT_2",
}

export const actions: ActionTree<PlaygroundState, RootState> = {
    [PlaygroundActions.LOAD_API_RESULT]: ({ commit }): Promise<Array<object>> => {
        return fetch("http://cat-fact.herokuapp.com/facts").then(data => data.json()).then(data => {
            commit("SET_CATS_FACTS", data);
            return data;
        });
    },

    [PlaygroundActions.LOAD_API_RESULT_2]: async ({ commit }): Promise<Array<object>> => {
        const data = await fetch("http://cat-fact.herokuapp.com/facts");
        const data_1 = await data.json();
        commit("SET_CATS_FACTS", data_1);
        return data_1;
    }
};