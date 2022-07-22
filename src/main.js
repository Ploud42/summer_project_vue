import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

/* import './assets/main.css' */

createApp(App).use(VueAxios, axios)

createApp(App).mount('#app')

import "bootstrap/dist/js/bootstrap.js"