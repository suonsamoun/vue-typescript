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
			<TodoList 
				:items="items" 
				:editItem="editItem"
				:removeItem="removeItem"
				:toggleCompleted="toggleCompleted" 
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TodoItem, ErrorClasses } from "../interfaces";
import { TodoItem, TodoList } from "../components";

export default defineComponent({
	name: "Home",
	components: {
		TodoList
	},
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
				{ id: 5, text: "Practice", completed: false },
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

		removeItem(id: number): void {
			this.items = this.items.filter(item => item.id !== id);
		},

		editItem(item: TodoItem): void {
			this.items = this.items.map(todo => {
				if (todo.id === item.id) {
					todo.text = prompt("Edit item", todo.text);
				}
				return todo;
			});
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
