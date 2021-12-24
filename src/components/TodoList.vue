<template>
    <TodoItem 
        v-for="item in items" 
        :key="item" 
        v-bind="item" 
        :item="item" 
        :editItem="editItem"
        :removeItem="removeItem" 
        :toggleCompleted="toggleCompleted" 
    />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TodoItem } from "../components";

export default defineComponent({
    name: "TodoList",
    props: {
        items: { type: Object, required: true },
        editItem: { type: Function, required: true },
        removeItem: { type: Function, required: true },
        toggleCompleted: { type: Function, required: true },
    },
    components: {
        TodoItem,
    },
});
</script>