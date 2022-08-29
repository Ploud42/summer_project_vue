import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Home from './components/Home.vue'

/* import './assets/main.css' */

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: Home },
    //{ path: '/about', component: About },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
// 4. Provide the history implementation to use. We are using the hash history for simplicity here.
history: VueRouter.createWebHashHistory(),
routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = Vue.createApp({})
app.use(VueAxios, axios)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)





app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"