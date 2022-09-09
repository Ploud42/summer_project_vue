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
          chosen: null
        }
    },
    mounted(){
      axios
        .get('http://localhost:8000/api/characters')
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
  <div class="container px-0">
    <!-- <h1>{{ chosen }}</h1> -->
    <div v-if = !chosen>
      <!-- {{$data}} -->
      <h2 class="text-center">Choisissez votre héro</h2>
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
      />
      
    </div>
  </div>
</template>

<style>

</style>
