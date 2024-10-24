import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import axios_plugin from './plugins/axios_plugin'
import store from './store/store'


createApp(App).use(router).use(axios_plugin).use(store).mount('#app')

