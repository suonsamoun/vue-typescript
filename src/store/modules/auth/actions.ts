import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationTypes } from "@/store/modules/auth/mutations";
import { State } from "@/store/modules/auth/state";
import { RootState } from '@/store';
import router from "@/router";
import { sleep } from "../todo/actions";

export enum ActionTypes {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    FETCH_USER = 'FETCH_USER',
}

type ActionArguments = Omit<ActionContext<State, RootState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}

export type Actions = {
    [ActionTypes.LOGIN]: (context: ActionArguments, payload: any) => void;
    [ActionTypes.LOGOUT]: (context: ActionArguments) => void;
    [ActionTypes.FETCH_USER]: (context: ActionArguments) => void;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async [ActionTypes.LOGIN]({ commit }, { username }) {

        commit(MutationTypes.LOGIN_START, true);
        await sleep(1000);

        try {
            localStorage.setItem('me', username);
            commit(MutationTypes.LOGIN_SUCCESS, username);
            router.push('/');
        } catch (error: any) {
            commit(MutationTypes.LOGIN_FAILED, `An error occuredAn error occured: ${error}`);
        }
    },
    async [ActionTypes.LOGOUT]({ commit }) {
        localStorage.removeItem('me');
        commit(MutationTypes.LOGOUT, false);
        router.push('/login');
    },
    async [ActionTypes.FETCH_USER]({ commit }) {
        commit(MutationTypes.LOGIN_SUCCESS, localStorage.getItem('me'));
    }
}
