<script>
import axios from 'axios'
export default {
  name: 'Character',
  props:{
          id: Number,
          character: Object,
      },
  data(){
    return {
      message: ''
    }
  },
  methods: {
    selectChar() {
        this.$emit('updateChosen', this.character )
    }
  }
}
</script>

<template>
  <div class="col-12 col-md-4 col-lg-4">
    <div class="card h-100 border-0 rounded-0 shadow px-0">

      <img v-if="character.image" :src="'http://localhost:8000/assets/images/heroesPP/' + character.image" class="card-img-top bg-dark rounded-0" alt="...">
      

      <div class="card-body">
       <!--  <div class="card-img-overlay">
          <h5 class="card-title mt-5"><span class="text-box px-2 py-2">{{ character.name }}</span></h5>
        </div> -->
        <div class="lh-sm">
          <p class="mb-0">HP : {{ character.hp }}</p>
          <p>Attack : {{ character.atk }}</p>
          <p>{{ message }}</p>
        </div>
      </div>
      <div class="card-footer text-center border-1">
        <button type="button" class="btn btn-play px-3 fs-3" v-on:click="selectChar">Play</button>
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

.card-img-top{
  object-fit: contain;
  
}

.card-footer{
  border-top: 1px solid rgba(160,160,160,0.2);
}

/* .card-img-overlay{
  z-index: 1;
} */

.btn-play{
  background: #ee6e73;
  /* z-index: 18; */
  position: relative;
}

.btn-play:hover{
  background: #c45b5e;
}
</style>