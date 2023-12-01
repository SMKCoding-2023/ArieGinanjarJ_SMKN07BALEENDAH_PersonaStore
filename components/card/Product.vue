<script setup lang="ts">
const props = defineProps(['prod']);
const isCart = ref(props.prod.isCart);

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

</script>
<template>
    <div class="card-product">
        <div class="img-con">
            <img width="150" :src="'https://qbfxozxkharybssnaezo.supabase.co/storage/v1/object/public/products/'+props.prod.img" alt="">
        </div>
        <div class="info">
            <NuxtLink :to="'/products/' + $props.prod.id" class="name">
                {{ props.prod.name }}
            </NuxtLink>
            <div class="price-info">
                <p>{{ (props.prod.price < 1000000) ? formatter.format(props.prod.price) : ('Rp ' + ((props.prod.price) / 1000000) + ' Jt').replace('.', ',') }}</p>
            </div>
        </div>
    </div>
</template>