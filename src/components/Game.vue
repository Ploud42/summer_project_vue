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
      message: '',
      stage: 1,
      monsterCurHp: Number
    }
  },
  mounted(){
    axios
      .get('http://localhost:8000/api/characters/5')
      .then(response => (this.monster = response.data, this.monsterCurHp = response.data.hp))
  },
  methods: {
    attack() {
      this.monsterCurHp -= this.character.atk;
      if (this.monsterCurHp < 0)
        this.monsterCurHp = 0;
    }
  }
}
</script>

<template>
    <div class="row text-center"><h2>Stage {{stage}}</h2></div>
    <div class="row align-items-end text-center ms-3 pb-5 g-bg mb-5">
        <div class="col-4">
          <div class="row  px-5">
            <span>
              <span class="btn fw-bold btn-gp" v-on:click="attack" >Attaque ({{character.atk}})</span>
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
          <div class="row">
            <span class="fw-bold text-center pe-5 fs-5 mb-3">ATK: {{ monster.atk }}</span>
          </div>
          <div class="row">
            <img v-if="monster.image" :src="'http://localhost:8000/assets/images/heroesPP/' + monster.image" class="img-fluid img-monster" alt="monster">
          </div>
          <div class="row">
            <span class="pe-5"><progress :value=" monsterCurHp " :max=" monster.hp "></progress></span>
          </div>
          <div class="row"><span class="fw-bold text-center pe-5 fs-5">HP : {{monsterCurHp}} / {{ monster.hp }} </span></div>
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
  height: 350px;
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

progress {
  height: 1.5em;
  width: 15em;
  background: crimson;
}

progress {
  color: lightblue;
}

progress::-moz-progress-bar {
  background: lightcolor;
}

progress::-webkit-progress-value {
  background: rgb(238, 59, 59);
}

progress::-webkit-progress-bar {
  background: white;
}
</style>