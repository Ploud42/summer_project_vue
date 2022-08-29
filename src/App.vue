<script>
  import axios from 'axios';
  import Character from './components/Character.vue';
  import Navbar from './components/Navbar.vue';
  import Game from './components/Game.vue';
  
  export default {
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
  <router-view></router-view>
</template>

<style>

</style>
