import { createClient } from "@supabase/supabase-js";
import { defineStore } from "pinia";

export const useCategoriesStore = defineStore("categories", () => {
  const { dbUrl, dbKey } = useAppConfig();
  const supabase = createClient(
    dbUrl,
    dbKey
  );
  const categories = ref([]);

  async function reloadCategories() {
    const { data, error }: any = await supabase
      .from("categories")
      .select("*")
      .order("id", { ascending: true });
    categories.value = data;
  }
  async function getCategoryWithId(id: any) {
    const { data, error }: any = await supabase
      .from('categories')
      .select('*')
      .eq('id', Number(id));
    return data;
  }
  async function addCategory(name: string) {
    const { data, error }: any = await supabase
      .from('categories')
      .insert([{name}])
      .select();
  }

  return { categories, reloadCategories, getCategoryWithId, addCategory };
});
