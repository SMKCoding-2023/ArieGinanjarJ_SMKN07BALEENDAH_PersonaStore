<script lang="ts" setup>
import { ref } from 'vue';

const keyword = ref('');
</script>
<template>
    <form @keyup="$emit('search', keyword)" class="search-bar" autocomplete="off">
        <input type="text" id="search-keyword" placeholder="Search Here..." v-model="keyword">
        <button id="search-button"><i class='bx bx-search'></i></button>
    </form>
</template>