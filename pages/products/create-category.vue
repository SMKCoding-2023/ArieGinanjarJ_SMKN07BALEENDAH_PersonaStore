<script lang="ts" setup>
import { useCategoriesStore } from '~/store/categories';

const categoriesStore = useCategoriesStore();
const { addCategory } = categoriesStore;
const name = ref('');

async function add() {
    await addCategory(name.value);
    await navigateTo('/products/create');
} 
</script>
<template>
    <form @submit.prevent="add" class="category-form">
        <input type="text" v-model="name" placeholder="Category Name">
        <button type="submit">ADD</button>
    </form>
</template>