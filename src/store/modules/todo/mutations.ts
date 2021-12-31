import { MutationTree } from 'vuex';
import { Todo } from '../../../interfaces';
import { TodoState } from './state';

export enum MutationTypes {
    SET_LOADING = 'SET_LOADING',
    CREATE_ITEM = 'CREATE_ITEM',
    SET_ITEMS = 'SET_ITEMS',
    EDIT_ITEM = 'EDIT_ITEM',
    DELETE_ITEM = 'DELETE_ITEM',
    TOGGLE_COMPLETED = 'TOGGLE_COMPLETED',
}

export type Mutations<State = TodoState> = {
    [MutationTypes.SET_LOADING]: (state: State, payload: boolean) => void;
    [MutationTypes.CREATE_ITEM]: (state: State, payload: Todo) => void;
    [MutationTypes.SET_ITEMS]: (state: State, payload: Todo[]) => void;
    [MutationTypes.EDIT_ITEM]: (state: State, payload: Todo) => void;
    [MutationTypes.DELETE_ITEM]: (state: State, payload: number) => void;
    [MutationTypes.TOGGLE_COMPLETED]: (state: State, payload: number) => void;
}

export const mutations: MutationTree<TodoState> & Mutations = {
    [MutationTypes.SET_LOADING](state: TodoState, payload: boolean) {
        state.loading = payload;
    },
    [MutationTypes.CREATE_ITEM](state: TodoState, payload: Todo) {
        state.items.unshift(payload);
    },
    [MutationTypes.SET_ITEMS](state: TodoState, payload: Todo[]) {
        state.items = payload;
    },
    [MutationTypes.EDIT_ITEM](state: TodoState, payload: Todo) {
        state.items = state.items.map(item => {
            if (item.id === payload.id) {
                item.text = prompt("Edit item", item.text);
            }
            return item;
        });
    },
    [MutationTypes.DELETE_ITEM](state: TodoState, payload: number) {
        state.items = state.items.filter(item => item.id !== payload);
    },
    [MutationTypes.TOGGLE_COMPLETED](state: TodoState, payload: number) {
        const index = state.items.findIndex(item => item.id === payload);
        state.items[index].completed = !state.items[index].completed;
    }
}