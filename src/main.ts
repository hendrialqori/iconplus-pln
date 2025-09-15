import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueKonva from 'vue-konva';

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

const app = createApp(App)

app.use(createPinia())
app
    .use(router)
    .use(VueKonva)

app.mount('#app')
