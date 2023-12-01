import { createClient } from '@supabase/supabase-js';
import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products',() => {
  const { dbUrl, dbKey } = useAppConfig();
  const supabase = createClient(
    dbUrl,
    dbKey
  );
  const products = ref([]);

  async function reloadProducts(from: number, to: number) {
    const { data, error }: any = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })
      .range(from, to);
    products.value = data;
  }
  async function addProduct(product: any, imgName: any, by: string) {
    product.img = imgName;
    product.by = by;
    const { data, error }: any = await supabase.from('products')
      .insert([product])
      .select('*');
  }
  async function getProductWithId(id: any) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', Number(id));
    return data;
  }
  async function sortProductsBy(column: any, asc: boolean, from: number, to: number) {
    const { data, error }: any = await supabase
      .from('products')
      .select('*')
      .order(column, { ascending: asc })
      .range(from, to);
    products.value = data;
  }
  async function filterProductsBy(column: any, value: any, from: number, to: number) {
    const { data, error }: any = await supabase
      .from('products')
      .select('*')
      .eq(String(column), value)
      .range(from, to);
    products.value = data;
  }
  async function getTotalProducts() {
    const { data, error, count }: any = await supabase
      .from('products')
      .select('*', { count: 'exact' });
    return count;
  }

  return { products, reloadProducts, addProduct, getProductWithId, sortProductsBy, filterProductsBy, getTotalProducts };
});