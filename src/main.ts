import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/dist/index.css'
import '@/assets/css/main.css';
import '@fortawesome/fontawesome-free/css/all.css'

createApp(App).use(ElementPlus).mount('#app')

// Count visits on the published homepage only, without displaying a widget.
const goatCounterEndpoint = import.meta.env.VITE_GOATCOUNTER_ENDPOINT?.trim()
if (import.meta.env.PROD && window.location.hostname === 'czzzzh.github.io' && goatCounterEndpoint) {
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://gc.zgo.at/count.js'
  script.dataset.goatcounter = goatCounterEndpoint
  document.head.appendChild(script)
}
