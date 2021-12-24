<template>
    <div class="flex items-center my-2 p-1">
        <div class="flex-shrink-0 m-1 ml-3 align-middle">
            <input type="checkbox" :checked="completed" @change="toggleCompleted(item)" />
        </div>
        <div class="ml-6">
            <h4
                class="text-xl text-gray-900 leading-tight"
                :class="completed ? 'line-through' : ''"
            >{{ text }}</h4>
        </div>
        <div class="flex-shrink-0 m-1">
            <button class="mx-3 text-green-500" @click="editItem(item)">Edit</button>
        </div>
        <div class="flex-shrink-0 m-1">
            <button class="text-red-500" @click="removeItem(item.id)">Delete</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "TodoItem",
    props: {
        item: { type: Object, required: true },
        text: { type: String, required: true },
        completed: { type: Boolean, required: true },
        editItem: { type: Function, required: true },
        removeItem: { type: Function, required: true },
        toggleCompleted: { type: Function, required: true },
    },
});

</script>