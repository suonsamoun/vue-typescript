<template>
    <nav
        class="bg-green-700 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800"
        v-if="$router.currentRoute.value.name !== 'Login'"
    >
        <div class="container flex flex-wrap justify-between items-center mx-auto max-w-2xl">
            <div class="order-2 flex items-center">
                <div class="mr-2 text-blue-900">Welcome: {{ $store.state.auth.me }}</div>
                <button
                    @click="logout"
                    type="button"
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >Logout</button>
            </div>
            <div
                class="justify-between items-center w-full md:flex md:w-auto md:order-1"
                id="mobile-menu-4"
            >
                <ul
                    class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
                >
                    <li>
                        <router-link
                            to="/"
                            class="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-white"
                        >Todo</router-link>
                    </li>
                    <li>
                        <router-link
                            to="/about"
                            class="block py-2 pr-4 pl-3 text-white rounded md:bg-transparent md:p-0 dark:text-white"
                        >About</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex"
export default defineComponent({
    name: "Navbar",
    methods: {
        ...mapActions({
            logout: "LOGOUT"
        })
    }
});
</script>
