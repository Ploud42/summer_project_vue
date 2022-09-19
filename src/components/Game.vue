<script>
import axios from 'axios';
import 'animate.css';
export default {
  name: 'Game',
  emits: ["resetChosen"],
  props:{
          id: Number,
          character: Object,
          token: Object
      },
  data(){
    return {
      monster:[],
      resultRun:[],
      loading:true,
      message: '',
      stage: 1,
      maxStage: 3,
      monsterID: 5,
      monsterCurHp: -1,
      heroCurHp: this.character.hp,
      isDisabled: null,
      monsterFlash: false,
      monsterDead: false,
      heroFlash: false,
      heroDead: false,
      /* victory: false,
      defeat: false, */
    }
  },
  mounted(){
    if (!this.$cookies.get("Token")){
      this.$emit('resetChosen');
    }
    axios
      .get('http://localhost:8000/api/characters/'+this.monsterID)
      .then(response => (this.monster = response.data, this.monsterCurHp = response.data.hp))
      .finally(this.loading = false)
  },
  methods: {
    async nextStage(){
      this.loading = true;
      this.monsterID++;
      await axios
        .get('http://localhost:8000/api/characters/'+this.monsterID)
        .then(response => (this.monster = response.data, this.monsterCurHp = response.data.hp))
        .finally(this.monsterDead = false, this.loading = false)
      
      this.stage++;
      this.heroCurHp = this.character.hp;
      this.isDisabled = false;
    },
    monstersAction(){
      this.heroCurHp -= this.monster.atk;
      if (this.heroCurHp < 0 || this.heroCurHp == 0){
        this.heroCurHp = 0;
        this.heroDead = true;
      }
      else {
        this.heroFlash = true;
        setTimeout(() => {
          this.heroFlash = false;
          this.isDisabled = false;
        }, 800)
      }
    },
    attack() {
      
      this.monsterCurHp -= this.character.atk;
      this.isDisabled = true;
      if (this.monsterCurHp < 0 || this.monsterCurHp == 0){
        this.monsterCurHp = 0;
        this.monsterDead = true;
      }
      else {
        this.monsterFlash = true;
        setTimeout(() => {
          this.monsterFlash = false;
          this.monstersAction();
        }, 800)
      }
    },
    closeGame() {
        this.$emit('resetChosen');
    },
    getCurrentDate(){
      const current = new Date();
      const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
      return date;
    },
    saveScore(){
      const date = this.getCurrentDate();
      axios
        .post('http://localhost:8000/api/runs',
        {
          date: date,
          score: this.stage.toString(),
          user: "api/users/" + this.token.id,
          charac: "api/characters/" + this.character.id  
        },
        {
          headers: {Authorization: 'bearer '+ this.$cookies.get("Token")}
        })
        .then(response => (
          this.resultRun = response.data,
          console.log(response.status)
          )
        )
        .catch( (e) => {
            this.errorMessage = "Erreur en chemin";
            console.log(e.message);
          }
        )
    }
  }
}
</script>

<template>
  <button type="button" class="btn fw-bold btn-gp" v-on:click="saveScore">Test saveScore</button>
  <div class="row text-center"><h2>Stage {{stage}}</h2></div>
  <div class="row align-items-end text-center ms-3 pb-5 g-bg mb-5">
    <div class="col-4">
      <div :class="{'animate__animated animate__fadeOut': heroDead }">
        <div class="row">
          <div v-if="heroFlash" class="animate__animated animate__fadeOutUp">
            <span class="fw-bold text-danger text-center fs-3">- {{ monster.atk }}</span>
          </div>
          <span v-show="!isDisabled">
            <span class="btn fw-bold btn-gp"  v-on:click="attack" >Attaque ({{character.atk}})</span>
            <span class="btn fw-bold btn-gp mx-2" :disabled="isDisabled">Defense</span>
            <span class="btn fw-bold btn-gp" :disabled="isDisabled">Special</span>
          </span>
        </div>
        <div class="row">
          <div :class="{'animate__animated animate__flash': heroFlash}">
            <img v-if="character.image" :src="'http://localhost:8000/assets/images/heroesPP/' + character.image" class="img-fluid img-hero ms-4" :alt="character.name">
          </div>
        </div>
        <div class="row">
          <span class=""><progress :value="heroCurHp" :max="character.hp" class="heroHpBar"></progress></span>
          <span class="fw-bold text-center fs-5 hp-info">{{ heroCurHp }} / {{ character.hp }}</span>
        </div>
      </div>
    </div>
    <div class="col-4 align-self-center">
      <div v-if="monsterCurHp == 0" class="fw-bold text-center fs-5 animate__animated animate__fadeInRightBig">
        <img src="../assets/youwin.png" class="img-fluid endOfFight" alt="">
        <button v-if="stage < maxStage" type="button" class="btn fw-bold btn-gp" v-on:click="nextStage">Next Stage</button> <!-- Victory ! -->
      </div> 
      <div v-if="heroCurHp == 0" class="animate__animated animate__fadeInRightBig">
        <img src="../assets/GameOver.png" class="img-fluid endOfFight" alt="">
        <router-link to="/" type="button" class="btn fw-bold btn-gp" @click="closeGame">New Game</router-link> <!-- Defeat -->
      </div>
    </div>
    <div class="col-4 text-center">
      <div v-if="loading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div v-else>
        <div :class="{'animate__animated animate__fadeOut': monsterDead }">
          <div class="row">
            <div v-if="monsterFlash" class="animate__animated animate__fadeOutUp">
              <span class="fw-bold text-danger text-center pe-5 fs-3 mb-3">- {{ character.atk }}</span>
            </div>
            <span  class="fw-bold text-center pe-5 fs-5 mb-3">{{ monster.atk }}</span>
          </div>
          <div class="row">
            <div :class="{'animate__animated animate__flash': monsterFlash}">
              <img v-if="monster.image" :src="'http://localhost:8000/assets/images/heroesPP/' + monster.image" class="img-fluid img-monster" alt="monster">
            </div>
          </div>
          <div v-if="monsterCurHp >= 0" class="row">
            <span class=""><progress :value="monsterCurHp" :max="monster.hp"></progress></span>
            <span class="fw-bold text-center fs-5 hp-info">{{monsterCurHp}} / {{ monster.hp }} </span>
          </div>
        </div>
      </div>
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

.hp-info{
  position: relative;
  bottom: 1.7em;
}

.endOfFight{
  object-fit:cover;
}

.img-hero{
  object-fit: contain;
  height: 350px;
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
  color: #c04347;
  border: 1px solid #c0464a;
}

progress {
  height: 1.5em;
  width: 15em;
  background: rgb(255, 255, 255);
  color: rgb(65, 131, 153);
  border-radius: 10px;
  overflow: hidden;
}

progress::-moz-progress-bar {
  background: rgb(226, 58, 58);
  border-radius: 10px 0 0 10px;
}

progress::-webkit-progress-value {
  background: rgb(226, 58, 58);
  border-radius: 10px 0 0 10px;
}

progress::-webkit-progress-bar {
  background: white;
  border-radius: 10px;
}

.heroHpBar {
  height: 1.5em;
  width: 15em;
  background: rgb(255, 255, 255);
  color: rgb(65, 131, 153);
}

.heroHpBar::-moz-progress-bar {
  background: rgb(9, 165, 255);
}

.heroHpBar::-webkit-progress-value {
  background: rgb(9, 165, 255);
}

.heroHpBar::-webkit-progress-bar {
  background: white;
}

.animate__animated.animate__flash {
  --animate-duration: 0.7s;
}
</style>