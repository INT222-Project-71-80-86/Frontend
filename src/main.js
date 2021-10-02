import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import Navbar from './components/Navbar.vue'
import ddnav from './components/ddnav.vue'
import footer from './components/footer.vue'
import store from './store'
const app = createApp(App).use(store)
app.component('nav-bar',Navbar)
app.component('dd-nav',ddnav)
app.component('footer-com',footer)
app.use(router).mount('#app')
