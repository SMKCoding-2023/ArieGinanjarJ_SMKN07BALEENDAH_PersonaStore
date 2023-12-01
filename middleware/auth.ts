export default defineNuxtRouteMiddleware((to, from) => {
  if(process.client) {
    let user =  localStorage.getItem('login') || '';
    if (!user) {
      return navigateTo('/login');
    }
  }
})