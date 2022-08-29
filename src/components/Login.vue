<script>
  import axios from 'axios';
  import Character from './Character.vue';
  import Navbar from './Navbar.vue';
  import Game from './Game.vue';

  export default {
    name: 'Login',
    components: {
      Character,
        Navbar,
        Game,
    },
    data(){
        return {
          results:[],
          chosen: null
        }
    },
    mounted(){
      axios
        .get('http://localhost:8000/api/characters')
        .then(response => (this.results = response.data['hydra:member']))
    },
    methods: {
      updateChosen(char) {
        this.chosen = char;
      },
      resetChosen(){
        this.chosen = null;
      }
    }
  }
</script>

<template>
  <Navbar/>
<form method="post" action="http://localhost:8000/authentication_token" class="w-50 mx-auto">

    <h1 class="h3 mb-3 font-weight-normal">Veuillez vous identifier</h1>
    <label for="inputEmail">Email</label>
    <input type="email" name="email" id="inputEmail" class="form-control" autocomplete="email" required autofocus>
    <label for="inputPassword">Mot de passe</label>
    <input type="password" name="password" id="inputPassword" class="form-control" autocomplete="current-password" required>

    <input type="hidden" name="_csrf_token"
           value="{{ csrf_token('authenticate') }}"
    >

    <button class="btn btn-lg btn-primary mt-3" type="submit">
        Se connecter
    </button>
</form>
</template>

<style>

</style>