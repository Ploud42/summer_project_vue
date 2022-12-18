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
        message: '',
        character:[],
        runDate:"",
        loading: true
        }
    },
    mounted(){
    if (!this.$cookies.get("Token")){
    this.$emit('resetChosen');
    }
/*     axios
    .get('https://daccodac.fr' + this.run.charac)
    .then(response => (this.character = response.data))
    .finally(this.loading = false) */
    this.loading = false;
    const tempDate = new Date(this.run.date);

    this.runDate = `${tempDate.getDate()}-${tempDate.getMonth() + 1}-${tempDate.getFullYear()}`;
    },
    methods: {

    }
}
</script>

<template>
    <div v-if="loading" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else>
        <div class="card mb-3">
            <div class="row g-0">
                    <div class="col-md-4">
                    <img v-if="run.charac.image" :src="'https://daccodac.fr/assets/images/heroesPP/' + run.charac.image" class="card-img-top  rounded-0" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                                <h1>{{ run.charac.name }}</h1>
                                <p class="mb-0 fs-4"> Le {{runDate}}</p>
                                <p class="fs-4"> Stage {{ run.score }}</p>
                                <p>{{ message }}</p>
                        </div>
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