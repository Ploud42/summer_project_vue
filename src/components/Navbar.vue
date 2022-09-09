<script>

export default{
    name: 'Navbar',
    props:{
        id: Number,
        navbar: Object,
        token: Object
    },
    data(){
        return {
            
        }
    },
    mounted(){

    },
    methods: {
    closeGame() {
        this.$emit('resetChosen')
    },
    logout() {
        this.$emit('logout')
    }
  }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/" @click="closeGame" ><img src="../assets/logoW.png" alt="" width="45" height="45" class="d-inline-block align-text-center">
                Little Game Project
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" @click="closeGame" class="nav-link">Home</router-link>
                    </li>
                </ul>
                <div v-if="token.pseudo">
                   <span class="nav-link me-5"> Bonjour, {{token.pseudo}}</span>
                   <router-link to="/" @click="logout" class="nav-link me-5">Se deconnecter</router-link>
                </div>
                <div v-else>
                    <router-link to="/login" class="nav-link me-5">Se connecter</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<style>
.navbar{
    background: #ee6e73;
}
</style>
