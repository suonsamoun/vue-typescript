import { Todo } from "@/interfaces"

export type State = {
    loading: boolean;
    items: Todo[];
}

export const state: State = {
    loading: false,
    items: []
}