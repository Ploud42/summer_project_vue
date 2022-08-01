<script>
export default {
  name: 'Game',
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

  }
}
</script>

<template>
    <p>TEST</p>
    <div class="row bg-dark">
        <div class="col-4">
            <img v-if="character.image" :src="'http://localhost:8000/assets/images/heroesPP/' + character.image" class="img-fluid float-start" :alt="character.name">
        </div>
        <div class="col-4"></div>
        <div class="col-4">
            <img v-if="character.image" src="http://localhost:8000/assets/images/heroesPP/zombie-a1a847685873295fd373cb622e01b039011ea011.png" class="img-fluid mt-5 me-5 float-end img-monster" alt="monster">
        </div>
    </div>
</template>

<style>

</style>