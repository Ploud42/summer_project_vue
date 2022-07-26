<script>
  import axios from 'axios';
  import Character from './components/Character.vue'
  export default {
    components: {
      Character,
    },
  data(){
      return {
        results:[]
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
  <div class="container px-0">
    <h1 class="text-center">Bienvenue sur Little game project</h1>
    <div class="row">
      <!-- {{$data}} -->
      <h2>Choisissez votre héro</h2>
      <Character
        v-for="result, index in results"
        :key="index"
        :character="result"
      />
    </div>
  </div>
</template>

<style>

</style>
