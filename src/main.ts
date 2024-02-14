import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/dist/index.css'
import '@/assets/css/main.css';
import '@fortawesome/fontawesome-free/css/all.css'

createApp(App).use(ElementPlus).mount('#app')