<script>

export default{
    name: 'Navbar',
    emits: ["resetChosen", "logout"],
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
        this.$emit('resetChosen');
    },
    logout() {
        this.$emit('resetChosen');
        this.$emit('logout');
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
                    <li class="nav-item">
                        <router-link to="/About" @click="closeGame" class="nav-link">About</router-link>
                    </li>
                </ul>
                <div v-if="token.pseudo" class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle me-5" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                         Bonjour, {{token.pseudo}}
                    </a>
                    <ul class="dropdown-menu">
                        <li><a v-if="token.roles.includes('ROLE_ADMIN')" class="dropdown-item" href="https://daccodac.fr/admin">Admin</a></li>
                        <li><router-link to="/score" class="dropdown-item">Mes scores</router-link></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><router-link to="/" class="dropdown-item" @click="logout">Se déconnecter</router-link></li>
                    </ul>
                </div>
                <div v-else>
                    <router-link to="/login" class="me-5">Se connecter</router-link>
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
