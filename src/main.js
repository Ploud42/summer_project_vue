import "bootstrap/dist/css/bootstrap.min.css"
import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies';
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import About from './components/About.vue'
import Game from './components/Game.vue'

const router = VueRouter.createRouter({
history: VueRouter.createWebHistory(),
routes: [
    {
        path: '/',
        name: 'Home',
        component: Home,

    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/game',
        name: 'Game',
        component: Game,
        props: true
    }
  ]
})

const app = createApp(App)
app.use(VueAxios, axios)
app.use(VueCookies)
app.use(router).mount('#app')
/* app.mount('app') */

import "bootstrap/dist/js/bootstrap.js"