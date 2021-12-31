<template>
    <TodoItem 
        v-for="item in items" 
        :key="item.id"
        v-bind="item" 
    />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TodoItem } from "@/components";
import { Todo } from "@/interfaces";

export default defineComponent({
    name: "TodoList",
    components: {
        TodoItem,
    },
    
    computed: {
        items(): Todo[] {
            return this.$store.state.todo.items;
        },
    },

});
</script>