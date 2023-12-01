<script lang="ts" setup>
if(process.client) {
  if(localStorage.getItem('login'))navigateTo('/');
}
import { useAuthStore } from '~/store/auth';

const authStore = useAuthStore();
const { signIn } = authStore;
const loading = ref(false);
const email = ref();
const password = ref();

async function login() {
  let userId: string | boolean = await signIn(email.value, password.value);
  if(!userId)return alert('username or password incorrect!');
  if(process.client) {
    localStorage.setItem('login', userId);
    reloadNuxtApp();
  }
}
</script>
<template>
  <form class="login" target="/" @submit.prevent="login">
    <div v-if="loading" class="loading"></div>
    <div v-if="loading" class="loading-bg"></div>
    <h1>login</h1>
    <input type="email" placeholder="email address" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button type="submit">LOGIN</button>
    <p>Have No Account ? <NuxtLink to="/register">Sign Up</NuxtLink></p>
  </form>
</template>