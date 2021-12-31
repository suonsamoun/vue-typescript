import { GetterTree } from 'vuex'
import { State } from './state'
import { RootState } from '../..';

export type Getters = {
    totalCount(state: State): number
    completedCount(state: State): number
}

export const getters: GetterTree<State, RootState> & Getters = {
    totalCount(state) {
        return state.items.length;
    },
    completedCount(state) {
        return state.items.filter(item => item.completed).length;
    }
}