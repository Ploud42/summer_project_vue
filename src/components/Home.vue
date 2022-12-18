<script>
  import axios from 'axios';
  import jwt_decode from 'jwt-decode';
  import Character from './Character.vue';
  import Navbar from './Navbar.vue';
  import Game from './Game.vue';

  export default {
    name: 'Home',
    components: {
      Character,
      Navbar,
      Game,
    },
    data(){
        return {
          results:[],
          token:[],
          chosen: null,
          message:""
        }
    },
    mounted(){
      axios
        .get('https://daccodac.fr/api/characters')
        .then(response => (this.results = response.data['hydra:member']))
      if (this.$cookies.isKey("Token")){
        this.token = jwt_decode(this.$cookies.get("Token"));
      }
    },
    methods: {
      updateChosen(char) {
        this.chosen = char;
      },
      resetChosen(){
        this.chosen = null;
      },
      logout(){
        if (this.$cookies.isKey("Token"))
          this.$cookies.remove("Token");
        this.token = [];
      },
      errorMessage(errMessage){
        this.message = errMessage;
        setTimeout(() => {
          this.message = "";
        }, 2500)
        
      }
    }
  }
</script>

<template>
  <Navbar
    v-on:resetChosen="resetChosen"
    v-on:logout="logout"
    :token="token"
  />
  <div class="container">
    <div v-if = !chosen>
      <!-- {{$data}} -->
      <h1 class="text-center">Choisissez votre héro</h1>
      <div v-if="message" class="row text-center"><span class="alert alert-info mx-auto">{{message}}</span></div>
      <div class="row g-3">
        <Character
          v-for="result, index in results"
          :key="index"
          :character="result"
          v-on:updateChosen="updateChosen"
        />
      </div>
    </div>
    <div v-else>
      <Game
        :character="chosen"
        v-on:resetChosen="resetChosen"
        v-on:errorMessage="errorMessage"
        :token="token"
      />
    </div>
  </div>
</template>

<style>

</style>
