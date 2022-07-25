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
  <div class="container text-center">
    <h1>Bienvenue sur Little game project</h1>
    <div>
      {{$data}}
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
