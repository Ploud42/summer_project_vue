<script>
import axios from 'axios'
export default {
name: 'Character',
props:{
        id: Number,
        character: Object,
    }
}
</script>

<template>
  <div class="col-12 col-md-4 col-lg-4">
    <div class="card mb-3 border-0 rounded-0 shadow px-0">

      <img v-if="character.image" :src="'http://localhost:8000/assets/images/heroesPP/' + character.image" class="card-img-top bg-dark rounded-0" alt="...">
      

      <div class="card-body">
        <div class="card-img-overlay">
          <h5 class="card-title mt-5"><span class="text-box px-2 py-2">{{ character.name }}</span></h5>
        </div>
        <p>HP : {{ character.hp }}</p>
        <p>ATK : {{ character.atk }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.card{
  background:rgb(84, 110, 122);
  color: white;
}

.text-box{
  background: rgb(65, 65, 65);
}
</style>