import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  Module,
} from "vuex";

import { RootState } from "@/store";
import { type State, state } from "@/store/modules/todo/state";
import { Mutations, mutations } from "@/store/modules/todo/mutations";
import { Actions, actions } from "@/store/modules/todo/actions";
import { Getters, getters } from "@/store/modules/todo/getters";

export { State };

export type TodoStore<S = State> = Omit<
  VuexStore<S>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export const store: Module<State, RootState> = {
  namespaced: false,
  state,
  getters,
  mutations,
  actions,
};

