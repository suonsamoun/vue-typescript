import { createStore, createLogger } from "vuex";
import { store as todo, TodoStore, State as TodoState } from "./modules/todo";

export type RootState = {
    todo: TodoState;
}

export type Store = TodoStore<Pick<RootState, 'todo'>>;
// && OtherStore<Pick<RootState, 'other'>>;

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
    plugins,
    modules: {
        todo
    }
});

export function useStore(): Store {
    return store as Store;
}