<script setup lang="ts">
const props = defineProps(['prod']);
const amount = ref(props.prod.total);
const id = ref(props.prod.id);

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});
</script>
<template>
    <div class="card-cart">
        <div class="img-con">
            <img width="150" :src="'https://qbfxozxkharybssnaezo.supabase.co/storage/v1/object/public/products/'+props.prod.img" alt="">
        </div>
        <div class="info">
            <h2 class="name">
                {{ props.prod.name }}
            </h2>
            <h3>
                {{ formatter.format(props.prod.price) }}
            </h3>
            <div class="acts">
                <button @click="$emit('remove-from-cart', id)">REMOVE FROM CART</button>
            </div>
        </div>
    </div>
</template>