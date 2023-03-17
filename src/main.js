import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'vfonts/OpenSans.css'
import './assets/main.scss'

import vue3GoogleLogin from 'vue3-google-login'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)

app.use(vue3GoogleLogin, {
	clientId: import.meta.env.VITE_OAUTH_GOOGLE_CLIENT_ID
})

app.mount('#app')
