<script>
import axios from 'axios';
export default {
  name: 'Game',
  props:{
          id: Number,
          character: Object,
      },
  data(){
    return {
      monster:[],
      message: ''
    }
  },
  mounted(){
    axios
      .get('http://localhost:8000/api/characters/4')
      .then(response => (this.monster = response.data))
  },
  methods: {

  }
}
</script>

<template>
    <!-- <h2>{{monster}}</h2> -->
    <div class="row align-items-end text-center ms-3 pb-5 g-bg mb-5">
        <div class="col-4">
          <div class="row  px-5">
            <span>
              <span class="btn fw-bold btn-gp">Attaque</span>
              <span class="btn fw-bold btn-gp mx-2">Defense</span>
              <span class="btn fw-bold btn-gp">Special</span>
            </span>
          </div>
          <div class="row">
            <img v-if="character.image" :src="'http://localhost:8000/assets/images/heroesPP/' + character.image" class="img-fluid float-start" :alt="character.name">
          </div>
          <div class="row">
            <span class="fw-bold text-center pe-5 fs-5 mb-3">ATK: {{ character.atk }} HP: {{ character.hp }}</span>
          </div>
        </div>
        <div class="col-4"></div>
        <div class="col-4">
            <img v-if="monster.image" :src="'http://localhost:8000/assets/images/heroesPP/' + monster.image" class="img-fluid mb-5 me-5 float-end img-monster" alt="monster">
        </div>
    </div>
</template>

<style>
.g-bg{
  background-image: url(../assets/NagrandBB.png) ;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 720px;
  width: 1280px;
  object-fit: contain;
}

.img-monster{
  object-fit: contain;
  height: 400px;
}

.btn-gp{
  background: #ee6e73;
  border: 1px solid black;
  color: black;
}

.btn-gp:hover{
  background: #c0464a;
  border: 1px solid black;
  color: white;
}

.btn-gp:active{
  background: white;
  color: #c0464a;
  border: 1px solid #c0464a;
}
</style>