import { MutationTree } from 'vuex';
import { state, State } from '@/store/modules/auth/state';

export enum MutationTypes {
    LOGIN_START = 'LOGIN_START',
    LOGIN_FAILED = 'LOGIN_FAILED',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGOUT = 'LOGOUT',
}

export type Mutations<S = State> = {
    [MutationTypes.LOGIN_START](state: S, payload: boolean): void;
    [MutationTypes.LOGIN_FAILED](state: S, payload: string): void;
    [MutationTypes.LOGIN_SUCCESS](state: S, payload: string | null): void;
    [MutationTypes.LOGOUT](state: S, payload: boolean): void;
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationTypes.LOGIN_START](state: State, payload: boolean) {
        state.loggingIn = payload;
    },
    [MutationTypes.LOGIN_FAILED](state: State, payload: string) {
        state.me = '';
        state.loggingIn = false;
        state.error = payload;
    },
    [MutationTypes.LOGIN_SUCCESS](state: State, payload: string) {
        state.me = payload;
        state.loggingIn = false;
        state.error = '';
    },
    [MutationTypes.LOGOUT](state: State, payload: boolean) {
        state.me = '';
        state.loggingIn = payload;
        // state.error = '';
    }
}