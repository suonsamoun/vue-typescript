import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  createLogger,
  Module,
} from "vuex";

import { TodoState, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

const todo: Module<TodoState, TodoState> = {
  state,
  getters,
  mutations,
  actions,
};

export default todo;
