import { createStore, createLogger } from "vuex";
import { store as auth, AuthStore, State as AuthState } from "@/store/modules/auth";
import { store as todo, TodoStore, State as TodoState } from "@/store/modules/todo";

export type RootState = {
    auth: AuthState;
    todo: TodoState;
}

export type Store = AuthStore<Pick<RootState, 'auth'>>
&TodoStore<Pick<RootState, 'todo'>>;

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

export const store = createStore({
    plugins,
    modules: {
        auth,
        todo
    }
});

export function useStore(): Store {
    return store as Store;
}