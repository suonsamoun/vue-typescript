<template>
	<div
		v-show="showWelcomeMsg"
		class="bg-green-900 text-white p-2 rounded-md"
	>Welcome to the Todo App!</div>
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
					:class="[isValid(text) ? '' : 'border-green-500']"
				>
					<div class="flex-grow m-1 ml-3">
						<input
							v-model="text"
							class="w-full focus:outline-none"
							type="text"
							placeholder="Enter new item"
						/>
					</div>
					<div class="flex-shrink-0">
						<button
							type="submit"
							class="text-white font-bold py-2 px-3 rounded"
							:class="isValid(text) ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-700'"
							:disabled="isValid(text)"
						>Add</button>
					</div>
				</div>
			</form>
			<h5 class="text-left text-red-500 px-2" v-show="hasItemExist(text)">
				<span>Item <strong>{{ text }}</strong> already exists!</span>
			</h5>
			<h5 class="text-left text-green-500 transition ease-in-out delay-150 px-2" v-show="isSuccess">
				Item successfully added!
			</h5>
			<h5 class="text-left text-red-500 px-2" v-show="totalCount == 0">You don't have any item!</h5>
			<TodoList />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Todo } from "@/interfaces";
import { TodoList } from "@/components";
import { ActionTypes, sleep } from "@/store/modules/todo/actions";
import { MutationTypes } from "@/store/modules/todo/mutations";

export default defineComponent({
	name: "Home",
	components: {
		TodoList
	},
	data() {
		return {
			text: '',
			isSuccess: false,
			showWelcomeMsg: false,
		} as {
			text: string;
			isSuccess: boolean;
			showWelcomeMsg: boolean;
		};
	},
	methods: {

		async addNewItem(): Promise<void> {

			if (this.isValid(this.text)) {
				this.isSuccess = false;
				return;
			}

			const item: Todo = {
				id: this.$store.state.todo.items.length + 1,
				text: this.text,
				completed: false,
			};
		
			this.$store.commit(MutationTypes.SET_LOADING, true);
			this.$store.commit(MutationTypes.CREATE_ITEM, item);

			this.isSuccess = true;
			this.text = "";

			await sleep(100);
			this.$store.commit(MutationTypes.SET_LOADING, false);

			await sleep(500);
			this.isSuccess = false;
		},

	},

	computed: {
		loading(): boolean {
			return this.$store.state.todo.loading;
		},

		completedCount(): number {
			return this.$store.getters.completedCount;
		},

		totalCount(): number {
			return this.$store.getters.totalCount;
		},

		isValid() {
			return this.$store.getters.isValid;
		},

		hasItemExist() {
			return this.$store.getters.itemExist;
		},

	},

	async created() {
		this.showWelcomeMsg = true;
		await sleep(1000);
		this.showWelcomeMsg = false;
	},

	mounted() {
		this.$store.dispatch(ActionTypes.GET_ITEMS);
	}
});

</script>
