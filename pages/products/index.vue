<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useProductsStore } from '~/store/products';
import { useCategoriesStore } from '~/store/categories';

definePageMeta({
  middleware: ["auth"]
});

const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const { reloadProducts, sortProductsBy, filterProductsBy, getTotalProducts } = productsStore;
const { reloadCategories,  } = categoriesStore;
const loading = ref(true);
const currentPage = ref(0);
const productsLimit = 10;
const totalProducts = await getTotalProducts();
let totalPages: any;

const { products }: any = storeToRefs(productsStore);
const { categories }: any = storeToRefs(categoriesStore);

onMounted(async () => {
    loading.value = true;
    await reloadProducts((currentPage.value * productsLimit), ((currentPage.value * productsLimit) + productsLimit) - 1);
    await reloadCategories();
    loading.value = false;
    totalPages = Math.floor(totalProducts / productsLimit);
});

async function filter(e: any) {
    currentPage.value = 0;
    switch(e.target.value) {
        case 'ph':
            sortProductsBy('price', false, (currentPage.value * productsLimit), ((currentPage.value * productsLimit) + productsLimit) - 1);
            break;
        case 'pl':
            sortProductsBy('price', true, (currentPage.value * productsLimit), ((currentPage.value * productsLimit) + productsLimit) - 1);
            break;
        case 'az':
            sortProductsBy('name', true, (currentPage.value * productsLimit), ((currentPage.value * productsLimit) + productsLimit) - 1);
            break;
        case 'za':
            sortProductsBy('name', false, (currentPage.value * productsLimit), ((currentPage.value * productsLimit) + productsLimit) - 1);
            break;
        case 'no':
            reloadProducts((currentPage.value * productsLimit), ((currentPage.value * productsLimit) + productsLimit) - 1);
            break;
        default:
            filterProductsBy('category', e.target.value, (currentPage.value * productsLimit), ((currentPage.value * productsLimit) + productsLimit) - 1);
            break;
    }
}
async function goTo(page: number) {
    currentPage.value = page;
    loading.value = true;
    await reloadProducts((currentPage.value * productsLimit), ((currentPage.value * productsLimit) + productsLimit) - 1);
    await reloadCategories();
    loading.value = false;
}
</script>
<template>
    <div class="products">
        <div class="acts">
            <select @change="filter" class="btn filter">
                <option value="no">Filter : NO</option>
                <option value="ph">Sort : PRICE HIGH</option>
                <option value="pl">Sort : PRICE LOW</option>
                <option value="az">Sort : NAME A-Z</option>
                <option value="za">Sort : NAME Z-A</option>
                <template v-for="ctgr in categories" :key="ctgr.id">
                    <option :value="ctgr.id">
                        Filter : category-{{ ctgr.name }}
                    </option>
                </template>
            </select>
            <NuxtLink to="/products/create" class="btn create">
                Create Product <i class='bx bx-message-square-add'></i>
            </NuxtLink>
        </div>
        <div class="cards">
            <div v-if="loading" class="loading"></div>
            <div v-if="loading" class="loading-bg"></div>
            <template v-for="prod in products" :key="prod.id">
                <CardProduct :prod="prod"></CardProduct>
            </template>
        </div>
        <div class="page-nav">
            <button @click="goTo(currentPage - 1)" class="prev-page btn" v-if="currentPage - 1 >= 0">&larrb;</button>
            <button @click="goTo(currentPage - 4)" v-if="currentPage - 4 >= 0" class="go-to-page">{{ currentPage - 3 }}</button>
            <button @click="goTo(currentPage - 3)" v-if="currentPage - 3 >= 0" class="go-to-page">{{ currentPage - 2 }}</button>
            <button @click="goTo(currentPage - 2)" v-if="currentPage - 2 >= 0" class="go-to-page">{{ currentPage - 1 }}</button>
            <button @click="goTo(currentPage - 1)" v-if="currentPage - 1 >= 0" class="go-to-page">{{ currentPage }}</button>
            <button class="current-page">{{ currentPage + 1 }}</button>
            <button @click="goTo(currentPage + 1)" v-if="currentPage + 1 <= totalPages" class="go-to-page">{{ currentPage + 2 }}</button>
            <button @click="goTo(currentPage + 2)" v-if="currentPage + 2 <= totalPages" class="go-to-page">{{ currentPage + 3 }}</button>
            <button @click="goTo(currentPage + 3)" v-if="currentPage + 3 <= totalPages" class="go-to-page">{{ currentPage + 4 }}</button>
            <button @click="goTo(currentPage + 4)" v-if="currentPage + 4 <= totalPages" class="go-to-page">{{ currentPage + 5 }}</button>
            <button @click="goTo(currentPage + 1)" v-if="currentPage + 1 <= totalPages" class="next-page btn">&rarrb;</button>
        </div>
    </div>
</template>