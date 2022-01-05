import { GetterTree } from 'vuex'
import { State } from '@/store/modules/todo/state'
import { RootState } from '@/store';

export type Getters = {
    totalCount(state: State): number
    completedCount(state: State): number
    isValid:(state: State) => (text: string) => boolean
    itemExist:(state: State) => (text: string) => boolean
}

export const getters: GetterTree<State, RootState> & Getters = {
    totalCount(state) {
        return state.items.length;
    },
    completedCount(state) {
        return state.items.filter(item => item.completed).length;
    },
    isValid: state => (text: string) => {
        return text.trim().length === 0 || getters.itemExist(state)(text);
    },
    itemExist: state => (text: string) => {
        return state.items.some(item => item.text.toLowerCase() === text.toLocaleLowerCase());
    }

    //2nd way
    // itemExist(state) {
    //     return (text: string) => {
    //         return state.items.some(item => item.text.toLowerCase() === text.toLocaleLowerCase());
    //     }
    // }
}