<template>
  <div class="container mx-auto mt-4">
    <h1 class="text-3xl text-center p-2 font-bold">Learn Vue with TypeScript (TodoApp)</h1>

    <div v-if="loading">
      <h3 class="text-center mt-4">Loading...</h3>
    </div>
    <div v-else>
      <p class="text-center mt-2">{{ completedCount }} of {{ totalCount }} completed.</p>
      <form class="my-4" @submit.prevent="addNewItem">
        <div
          class="mx-auto flex items-center bg-white p-2 rounded-md shadow-md"
          :class="[text !== '' ? validClasses : '', errorClasses]"
        >
          <div class="flex-grow m-1 ml-3">
            <input
              v-model="text"
              class="w-full focus:outline-none"
              type="text"
              placeholder="Enter new item"
              @keyup="isRequired = text !== '' ? false : true"
            />
          </div>
          <div class="flex-shrink-0">
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded"
            >Add</button>
          </div>
        </div>
      </form>
      <h5 class="text-left text-red-600" v-show="isRequired">Please enter an item!</h5>
      <h5
        class="text-left text-green-500 transition ease-in-out delay-150"
        v-show="isSuccess"
      >Item successfully added!</h5>
      <div
        v-for="(item, index) in items"
        :key="index"
        v-bind="item"
        class="flex items-center my-2 p-1"
      >
        <div class="flex-shrink-0 m-1 ml-3 align-middle">
          <input type="checkbox" :checked="item.completed" @change="toggleCompleted(item)" />
        </div>
        <div class="ml-6">
          <h4
            class="text-xl text-gray-900 leading-tight"
            :class="item.completed ? 'line-through' : ''"
          >{{ item.text }}</h4>
        </div>
        <div class="flex-shrink-0 m-1">
          <button class="mx-3 text-green-500" @click="editItem(index)">Edit</button>
        </div>
        <div class="flex-shrink-0 m-1">
          <button class="text-red-500" @click="removeItem(index)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TodoItem, ErrorClasses } from "../interfaces";

export default defineComponent({
  name: "Home",
  data() {
    return {
      text: '',
      loading: false,
      isRequired: false,
      isSuccess: false,
      validClasses: "border-b-2 border-green-500",
      items: [
        { id: 1, text: "Learn Vue", completed: true },
        { id: 2, text: "Learn TypeScript", completed: true },
        { id: 3, text: "Learn Vuex", completed: false },
        { id: 4, text: "Learn Vue Router", completed: true },
        { id: 3, text: "Practice", completed: false },
      ]
    } as {
      text: string;
      loading: boolean;
      isRequired: boolean;
      isSuccess: boolean;
      validClasses: string;
      items: TodoItem[];
    };
  },
  methods: {

    addNewItem(): void {

      if (this.text === '') {
        this.isRequired = true;
        this.isSuccess = false;
        return;
      }

      this.loading = true;

      this.items = [
        {
          id: this.items.length + 1,
          text: this.text,
          completed: false,
        },
        ...this.items
      ];

      this.text = "";
      this.isSuccess = true;
      this.isRequired = false;

      setTimeout(() => {
        this.loading = false;
      }, 500);

      setTimeout(() => {
        this.isSuccess = false;
      }, 5000);

    },

    removeItem(index: number): void {
      this.items.splice(index, 1);
    },

    editItem(index: number): void {
      this.items[index].text = prompt("Edit item", this.items[index].text);
    },

    toggleCompleted(item: TodoItem): void {
      item.completed = !item.completed;
    },

  },

  computed: {

    completedCount(): number {
      return this.items.filter(item => item.completed).length;
    },

    totalCount(): number {
      return this.items.length;
    },

    errorClasses(): ErrorClasses {
      return {
        'border-b-2': this.isRequired,
        "border-red-500": this.isRequired,
      };
    },

  },

  // watch: {
  //   text(val): void {
  //     console.log(val);
  //     if (val !== '') this.isRequired = false;
  //   }
  // }
});

</script>
