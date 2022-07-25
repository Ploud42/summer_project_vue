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
  <div class="card mb-3" >
    <div class="row g-0">
      <div class="col-md-3">
        <img v-if="character.image" :src="'file://C:/xampp/htdocs/summer_project_jdr/public/assets/images/heroesPP/' + character.image" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <h5 class="card-title">{{ character.name }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

</style>