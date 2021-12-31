import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationTypes } from "./mutations";
import { TodoState } from "./state";

export enum ActionTypes {
    GET_ITEMS = 'GET_ITEMS',
}

type ActionArguments = Omit<ActionContext<TodoState, TodoState>, 'commit'> & {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
}


export type Actions = {
    [ActionTypes.GET_ITEMS]: (context: ActionArguments) => void;
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const actions: ActionTree<TodoState, TodoState> & Actions = {
    async [ActionTypes.GET_ITEMS]({ commit }) {
        commit(MutationTypes.SET_LOADING, true)

        await sleep(300)

        commit(MutationTypes.SET_LOADING, false)
        commit(MutationTypes.SET_ITEMS, [
            { id: 1, text: "Learn Vue", completed: false },
            { id: 2, text: "Learn TypeScript", completed: false },
            { id: 3, text: "Learn Vuex", completed: true },
            { id: 4, text: "Learn Vue Router", completed: false },
            { id: 5, text: "Practice", completed: false },
        ])
        
    }
}


// mutations is synchronous
// actions is asynchronous