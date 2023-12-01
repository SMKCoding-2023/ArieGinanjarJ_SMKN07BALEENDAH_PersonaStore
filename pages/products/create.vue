<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useCategoriesStore } from '~/store/categories';
import { useProductsStore } from '~/store/products';
import { useProductsStorageStore } from '~/store/productsStorage';
import { useUsersStore } from '~/store/users';

const categoriesStore = useCategoriesStore();
const productsStore = useProductsStore();
const productsStorageStore = useProductsStorageStore();
const usersStore = useUsersStore();
const { reloadCategories } = categoriesStore;
const { addProduct } = productsStore;
const { uploadImage } = productsStorageStore;
const { getName } = usersStore;
const { categories }: any = storeToRefs(categoriesStore);
const loading = ref(true);
const alertMsg = ref('');
const alertType = ref('');
const fileImg = ref();
const previewImgUrl = ref();

const product = ref({
  name: '',
  desc: '',
  price: '',
  category: '',
  img: '',
  isCart: false
});

function isImage(file: any){
  if(!file)return false;
  return file.type.split('/')[0]=='image';
}

async function add() {
  loading.value = true;
  setTimeout(() => {
    alertMsg.value = '';
    alertType.value = '';
  }, 3000);

  if(!product.value.name) {
    alertMsg.value = "Product Name Is Required";
    alertType.value = "error";
    loading.value = false;
    return;
  }
  if(product.value.name.length < 5) {
    alertMsg.value = "Product Name Is To Short (min length: 5)";
    alertType.value = "error";
    loading.value = false;
    return;
  }
  if(!product.value.desc) {
    alertMsg.value = "Product Description Is Required";
    alertType.value = "error";
    loading.value = false;
    return;
  }
  if(product.value.desc.length < 20) {
    alertMsg.value = "Product Description Is To Short (min length: 20)";
    alertType.value = "error";
    loading.value = false;
    return;
  }
  if(!product.value.price) {
    alertMsg.value = "Product Price Is Required";
    alertType.value = "error";
    loading.value = false;
    return;
  }
  if(Number(product.value.price) < 0) {
    alertMsg.value = "Product Price Forbidden To Be Minus";
    alertType.value = "error";
    loading.value = false;
    return;
  }
  if(!product.value.img) {
    alertMsg.value = "Product Picture Is Required";
    alertType.value = "error";
    loading.value = false;
    return;
  }
  if(!product.value.category) {
    alertMsg.value = "Product Category Is Required";
    alertType.value = "error";
    loading.value = false;
    return;
  }
  if(!isImage(fileImg.value)) {
    alertMsg.value = "The File Is Not An Image";
    alertType.value = "error";
    loading.value = false;
    return;
  }

  let addedBy = '';
  if(process.client) {
    addedBy = localStorage.getItem('login') || '';
  }
  let nowTime = Date.now();
  let imgName = `${nowTime}-${fileImg.value.name.replace(" ", "-")}`;
  await addProduct(product.value, imgName, addedBy);
  await uploadImage(fileImg.value, imgName);
  loading.value = false;
  alertMsg.value = "Product Succesfully Added";
  alertType.value = "success";
  product.value = {
    name: '',
    desc: '',
    price: '',
    category: '',
    img: '',
    isCart: false
  }
   alertMsg.value = '';
   alertType.value = '';
   fileImg.value = '';
   previewImgUrl.value = '';
   return;
   window.location.reload();
}

async function changePreview(e: any) {
  fileImg.value = e.target.files[0];
  product.value.img = fileImg.value.name;
  previewImgUrl.value = URL.createObjectURL(fileImg.value);
}

onMounted(() => {
  loading.value = true;
  reloadCategories();
  loading.value = false;
})
</script>
<template>
  <div class="create-form">
    <div @click="alertType = ''; alertMsg = ''" class="alert" :class="alertType">{{ alertMsg }}<br><b>click to hide alert</b></div>
    <div v-if="loading" class="loading-bg"></div>
    <div v-if="loading" class="loading"></div>
    <form @submit.prevent="add">
      <NuxtLink class="btn" to="/products">Back</NuxtLink>
        <input type="text" v-model="product.name" placeholder="Product Name" />
        <textarea v-model="product.desc" placeholder="Product Description"></textarea>
        Rp. <input type="number" v-model="product.price" placeholder="Product Price" />
        <p v-if="!previewImgUrl">Upload Picture</p>
        <img v-if="previewImgUrl" :src="previewImgUrl" width="300">
        <input @change="changePreview" type="file" />
        <select v-model="product.category">
          <option value="" hidden>Select Category</option>
          <template v-for="ctgr in categories" :key="ctgr.id">
            <option :value="ctgr.id">{{ ctgr.name }}</option>
          </template>
        </select>
        No desired category?<NuxtLink to="/products/create-category"> Create Category</NuxtLink>
        <button class="btn" type="submit">Add</button>
    </form>
  </div>
</template>