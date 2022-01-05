<template>
    <TodoItem v-for="item in items" :key="item.id" v-bind="item" />
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { TodoItem } from "@/components";
import { Todo } from "@/interfaces";
import { useStore } from "@/store";

export default defineComponent({
    name: "TodoList",
    components: {
        TodoItem,
    },

    setup() {
        const { state } = useStore();
        const items = computed((): Todo[] => state.todo.items);

        return { items };
    }
});
</script>