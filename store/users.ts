import { createClient } from '@supabase/supabase-js';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUsersStore = defineStore('users',() => {
  const { dbUrl, dbKey } = useAppConfig();
  const supabase = createClient(
    dbUrl,
    dbKey
  );
  const users = ref([]);
  async function getUserWithID(id: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id);
    return data ? data[0] : false;
  }
  async function addUser(user: any) {
    const { data, error } = await supabase
      .from('users')
      .insert([user])
      .select('*');
    console.log(error);
  }
  async function checkNewUser(user: any) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .or(`name.eq.${user.name}, email.eq.${user.email}`);
    if(data?.length != 1)return true;
    return false;
  }
  async function getCart(id: string) {
    let { data, error } = await supabase
      .from('users')
      .select('incarts')
      .eq('id', id);
    data = data || [];
    return data[0].incarts || [];
  }
  async function setCart(id: string, newData: any) {
    let user = await getUserWithID(id);
    user.incarts = newData;
    let { data, error } = await supabase
    .from('users')
    .update(user)
    .eq('id', id);
  }
  async function getName(id: string) {
    let { data, error } = await supabase
      .from('users')
      .select('name')
      .eq('id', id);
    data = data || [];
    return data[0].name || [];
  }

  return { getUserWithID, addUser, checkNewUser, getCart, setCart, getName };
});