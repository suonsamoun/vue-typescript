import { GetterTree } from 'vuex'
import { TodoState } from './state'

export type Getters = {
    totalCount(state: TodoState): number
    completedCount(state: TodoState): number
}

export const getters: GetterTree<TodoState, TodoState> & Getters = {
    totalCount(state) {
        return state.items.length;
    },
    completedCount(state) {
        return state.items.filter(item => item.completed).length;
    }
}