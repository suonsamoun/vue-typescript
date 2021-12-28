<template>
	<div v-show="showWelcomeMsg" class="bg-green-900 text-white p-2 rounded-md">Welcome to the Todo App!</div>
	<div class="container max-w-md mx-auto mt-4 shadow-lg p-3">
		<h1 class="text-3xl text-center p-2 font-bold">Todo App</h1>
		<div v-if="loading">
			<h3 class="text-center mt-4">Loading...</h3>
		</div>
		<div v-else>
			<p class="text-center mt-2">{{ completedCount }} of {{ totalCount }} completed.</p>
			<form class="my-4" @submit.prevent="addNewItem">
				<div
					class="mx-auto flex items-center bg-white p-2 rounded-md border-2"
					:class="[isEmpty ? '' : 'border-green-500', isRequired ? 'border-red-500' : '']"
				>
					<div class="flex-grow m-1 ml-3">
						<input
							v-model="text"
							class="w-full focus:outline-none"
							type="text"
							placeholder="Enter new item"
							@keyup="validateInput"
						/>
					</div>
					<div class="flex-shrink-0">
						<button
							type="submit"
							class="text-white font-bold py-2 px-3 rounded"
							:class="isEmpty ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-700'"
							:disabled="isEmpty"
						>Add</button>
					</div>
				</div>
			</form>
			<h5 class="text-left text-red-600" v-show="isRequired && !isDuplicated">Please enter an item!</h5>
			<h5 class="text-left text-yellow-600" v-show="isDuplicated">Item {{ text }} already exists!</h5>
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
import { TodoItem } from "../interfaces";
import { TodoList } from "../components";

export default defineComponent({
	name: "Home",
	components: {
		TodoList
	},
	data() {
		return {
			text: '',
			loading: false,
			showWelcomeMsg: false,
			isRequired: false,
			isSuccess: false,
			isDuplicated: false,
			items: [
				{ id: 1, text: "Learn Vue", completed: false },
				{ id: 2, text: "Learn TypeScript", completed: false },
				{ id: 3, text: "Learn Vuex", completed: true },
				{ id: 4, text: "Learn Vue Router", completed: true },
				{ id: 5, text: "Practice", completed: false },
			]
		} as {
			text: string;
			loading: boolean;
			isRequired: boolean;
			isSuccess: boolean;
			isDuplicated: boolean;
			showWelcomeMsg: boolean;
			items: TodoItem[];
		};
	},
	methods: {

		validateInput(): boolean {
			return this.isRequired = this.isEmpty;
		},

		addNewItem(): void {
			if (this.isEmpty) {
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

			this.isSuccess = true;
			this.isRequired = false;
			this.text = "";

			setTimeout(() => {
				this.loading = false;
			}, 100);

			setTimeout(() => {
				this.isSuccess = false;
			}, 3000);
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

		isEmpty(): boolean {
			return this.text === '' || this.isDuplicated;
		},

		completedCount(): number {
			return this.items.filter(item => item.completed).length;
		},

		totalCount(): number {
			return this.items.length;
		}

	},

	created() {
		this.showWelcomeMsg = true;
		setTimeout(() => {
			this.showWelcomeMsg = false;
		}, 1000);
	},

	watch: {
		text(newValue: string): void {
			const duplicatedItem = this.items.find(item => item.text.toLowerCase() === newValue.toLowerCase());
			if (duplicatedItem) {
				this.isDuplicated = true;
			} else {
				this.isDuplicated = false;
			}
		}
	}
});

</script>
