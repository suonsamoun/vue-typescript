<template>
    <div class="flex h-screen bg-green-700">
        <div class="w-full max-w-xs m-auto bg-green-100 rounded p-5">
            <form @submit.prevent="login">
                <div>
                    <label class="block mb-2 text-green-500" for="username">Login Name</label>
                    <input
                        class="w-full p-2 mb-6 text-green-700 border-b-2 border-green-500 outline-none focus:bg-gray-300"
                        type="text"
                        name="username"
                        v-model="username"
                        placeholder="Enter any name to login"
                    />
                </div>
                <button
                    class="w-full text-white font-bold py-2 px-4 mb-6 rounded flex items-center justify-center"
                    :disabled="username === '' || $store.state.auth.loggingIn"
                    :class="username === '' || $store.state.auth.loggingIn ? 'bg-gray-700' : 'bg-green-700 hover:bg-green-900 hover:cursor-pointer'"
                    type="submit"
                >
                    <span>Login</span>
                    <svg
                        v-show="$store.state.auth.loggingIn"
                        class="h-5 w-5 text-white ml-2 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        />
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                </button>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { ActionTypes } from "@/store/modules/auth/actions";

export default defineComponent({
    name: "Login",
    setup() {
        const { dispatch } = useStore();
        const username = ref('');

        const login = () => {
            if (username.value === '') return;
            dispatch(ActionTypes.LOGIN, { username: username.value });
        }

        return {
            username,
            login
        };
    }
});
</script>
