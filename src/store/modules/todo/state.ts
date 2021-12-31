import { Todo } from "../../../interfaces"

export type TodoState = {
    loading: boolean;
    items: Todo[];
}

export const state: TodoState = {
    loading: false,
    items: []
}