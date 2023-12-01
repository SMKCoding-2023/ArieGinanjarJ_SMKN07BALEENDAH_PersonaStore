<script lang="ts" setup>
definePageMeta({
  middleware: ['auth']
});
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { useProductsStore } from '~/store/products';
import { useCategoriesStore } from '~/store/categories';
import { useUsersStore } from '~/store/users';

const route = useRoute();
const id = ref(route.params.id);
const product = ref();
const category = ref();
const productsStore = useProductsStore();
const categoriesStore = useCategoriesStore();
const usersStore = useUsersStore();
const isCart = ref(false);
const addedBy = ref();
const { getProductWithId } = productsStore;
const { getCategoryWithId } = categoriesStore;
const { getCart, setCart, getName } = usersStore;
let cart = [[]];

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

let buffer = await getProductWithId(id.value) || [{}];
product.value = buffer[0];
buffer = await getCategoryWithId(product.value.category);
category.value = buffer[0];
if(process.client){
  let userId = localStorage.getItem('login') || '';
  addedBy.value = await getName(userId);
  cart = await getCart(userId);
  let isExist = false;
    cart.forEach((p: any) => {
      if(p.includes(product.value.id)){
        isExist = true;
      }
      isCart.value = false;
    });
    if(isExist) {
      isCart.value = true;
    }
}

async function add() {
  if(process.client) {
    let userId = localStorage.getItem('login') || '';
    let userCart = await getCart(userId);
    let isExist = false;
    userCart.forEach((p: any) => {
      if(p.includes(product.value.id)){
        isExist = true;
      }
      isCart.value = false;
    });
    if(!isExist) {
      userCart.push([product.value.id, 1]);
      setCart(userId, userCart);
      isCart.value = true;
    } else {
      isCart.value = true;
    }
  }
}
</script>
<template>
  <div class="detail">
    <div class="container">
      <div class="img-container">
        <img :src="'https://qbfxozxkharybssnaezo.supabase.co/storage/v1/object/public/products/' + product.img">
        <div class="name">
          <h3>{{ product.name }}</h3>
          <h5>Added By : {{ addedBy }}</h5>
          <h5>{{ (product.price < 1000000) ? formatter.format(product.price) : ('Rp ' + ((product.price) / 1000000) + ' Jt').replace('.', ',') }}</h5>
        </div>
      </div>
      <div class="info">
        <h5>{{ category.name }}</h5>
        <NuxtLink class="btn" to="/products"><i class="bx bx-exit"></i></NuxtLink>
        <div class="btns">
          <button @click="add">{{ isCart ? "In Cart" : "Add To Cart"}}<i :class="isCart ? 'bx bx-x' : ''"></i></button>
        </div>
        <div class="description">
          Description : <br/>
          {{ product.desc }}
        </div>
      </div>
    </div>
  </div>
</template>