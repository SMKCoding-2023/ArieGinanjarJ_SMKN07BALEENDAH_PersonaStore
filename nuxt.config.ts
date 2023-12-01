// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Montserrat"},
        {rel: "stylesheet", href: "https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"}
      ],
      title: "PersonaStore"
    }
  },
  appConfig: {
    dbUrl: process.env.DB_URL,
    dbKey: process.env.DB_KEY
  },
  css: ["~/assets/scss/global.scss"],
  modules: ["@pinia/nuxt"],
  devtools: { enabled: true }
})