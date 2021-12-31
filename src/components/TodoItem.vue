<template>
    <div class="flex items-center justify-between my-2 p-1">
        <div class="flex">
                <div class="flex-shrink-0 m-1 align-middle">
                <input type="checkbox" :checked="completed" @change="toggleCompleted()" />
            </div>
            <h4 class="text-xl text-gray-900 leading-tight ml-6" :class="completed ? 'line-through' : ''">{{ text }}</h4>
        </div>
        <div class="flex items-center">
            <svg @click="editItem()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <svg @click="deleteItem()" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-3 text-rose-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { MutationTypes } from "../store/modules/todo/mutations";

export default defineComponent({
    name: "TodoItem",
    props: {
        id: { type: Number, required: true },
        text: { type: String, required: true },
        completed: { type: Boolean, required: true }
    },

    methods: {
        toggleCompleted(): void {
           this.$store.commit(MutationTypes.TOGGLE_COMPLETED, this.$props.id);
        },

        editItem(): void {
            this.$store.commit(MutationTypes.EDIT_ITEM, this.$props);
        },

        deleteItem(): void {
            this.$store.commit(MutationTypes.DELETE_ITEM, this.$props.id);
        },
    },

});

</script>