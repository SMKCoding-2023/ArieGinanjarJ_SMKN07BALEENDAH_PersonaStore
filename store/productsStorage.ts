import { createClient } from '@supabase/supabase-js';
import { defineStore } from 'pinia';

export const useProductsStorageStore = defineStore('productsStorage',() => {
  const { dbUrl, dbKey } = useAppConfig();
  const supabase = createClient(
    dbUrl,
    dbKey
  );
  async function uploadImage(fileImg: any, imgName: any) {
    let { data, error } = await supabase.storage
      .from('products')
      .upload(String(imgName), fileImg);
  }

  return { uploadImage };
});