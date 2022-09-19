<script>
import axios from 'axios'
export default {
  name: 'Run',
  props:{
          id: Number,
          run: Object,
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
    <div class="card mb-3">
        <div class="row g-0">
                <div class="col-md-4">
                <img v-if="run.charac.image" :src="'http://localhost:8000/assets/images/heroesPP/' + run.charac.image" class="card-img-top bg-dark rounded-0" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                            <h1>{{ run.charac.name }}</h1>
                            <p class="mb-0"> Le {{ run.date }}</p>
                            <p> Stage {{ run.score }}</p>
                            <p>{{ message }}</p>
                    </div>
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
</style>