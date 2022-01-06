export type State = {
    me: string | null;
    loggingIn: boolean;
    error: string;
}

export const state: State = {
    me: '',
    loggingIn: false,
    error: '',
}
