<template>
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
					<div class="flex-grow m-1 ml-3 relative">
						<input
							v-model="text"
							class="w-full focus:outline-none"
							type="text"
							placeholder="Enter new item"
						/>
						<span class="absolute flex right-0 top-0 bottom-0">{{ text.length }} / {{ textLimit }}</span>
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
				<span>
					Item
					<strong>{{ text }}</strong> already exists!
				</span>
			</h5>
			<h5
				class="text-left text-green-500 transition ease-in-out delay-150 px-2"
				v-show="isSuccess"
			>Item successfully added!</h5>
			<h5 class="text-left text-red-500 px-2" v-show="totalCount == 0">You don't have any item!</h5>
			<TodoList />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs, watch } from "vue";
import { Todo } from "@/interfaces";
import { TodoList } from "@/components";
import { ActionTypes, sleep } from "@/store/modules/todo/actions";
import { MutationTypes } from "@/store/modules/todo/mutations";
import { useStore } from "@/store";

export default defineComponent({
	name: "Todo",
	components: {
		TodoList
	},

	setup() {

		const { state, dispatch, commit, getters } = useStore();
		const textLimit = 30;
		const text = ref("");
		const statuses = reactive({
			isSuccess: false
		});

		const { isSuccess } = toRefs(statuses);

		const loading = computed(() => state.todo.loading);
		const totalCount = computed(() => getters.totalCount);
		const completedCount = computed(() => getters.completedCount);
		const isValid = computed(() => getters.isValid);
		const hasItemExist = computed(() => getters.itemExist);

		const addNewItem = async (): Promise<void> => {
			if (isValid.value(text.value)) {
				isSuccess.value = false;
				return;
			}

			const item: Todo = {
				id: state.todo.items.length + 1,
				text: text.value,
				completed: false
			};

			commit(MutationTypes.SET_LOADING, true);
			commit(MutationTypes.CREATE_ITEM, item);

			isSuccess.value = true;
			text.value = "";

			await sleep(100);
			commit(MutationTypes.SET_LOADING, false);

			await sleep(500);
			isSuccess.value = false;

		};

		watch(text, (value) => {
			const length = value.length;
			if (length > 10) text.value = value.slice(0, textLimit);
		});

		onMounted(() => dispatch(ActionTypes.GET_ITEMS));

		return {
			text,
			textLimit,
			loading,
			totalCount,
			completedCount,
			isValid,
			hasItemExist,
			isSuccess,
			addNewItem,
		}

	}
});

</script>
