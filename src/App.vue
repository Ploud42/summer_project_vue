<script>
  import axios from 'axios';
  import Character from './components/Character.vue';
  import Navbar from './components/Navbar.vue';
  export default {
    components: {
      Character,
        Navbar,
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
    }
  }
</script>

<template>
  <Navbar/>
  <div class="container px-0">
    <div v-if = !chosen>
      <!-- {{$data}} -->
      {{ chosen }}
      <h2 class="text-center">Choisissez votre héro</h2>
      <div class="row g-3">
        <Character
          v-for="result, index in results"
          :key="index"
          :character="result"
        />
      </div>
    </div>
  </div>
</template>

<style>

</style>
