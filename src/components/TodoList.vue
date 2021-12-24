<template>
    <TodoItem v-for="item in items" :key="item" v-bind="item" :toggleCompleted="toggleClick(items)" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TodoItem } from "../components";

export default defineComponent({
    name: "TodoList",
    props: {
        items: { type: Object, required: true },
        toggleClick: { type: Function, required: true },
    },
    components: {
        TodoItem,
    },
});
</script>