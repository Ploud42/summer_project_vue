<script>
    import axios from 'axios';
    import Navbar from './Navbar.vue';
    import Run from './Run.vue';
    import jwt_decode from 'jwt-decode';

    export default {
        name: 'Score',
        components: {
            Navbar,
            Run
        },
        data(){
            return {
            runs: [],
            token: [],
            }
        },
        mounted(){
            if (this.$cookies.isKey("Token")){
                this.token = jwt_decode(this.$cookies.get("Token"));
            }
            else {
                this.$router.push("/");
            }
            axios
                .get('http://localhost:8000/api/runs?user=api/users/' + this.token.id,
                {
                    headers: {Authorization: 'bearer '+ this.$cookies.get("Token")}
                })
                .then(response => (this.runs = response.data['hydra:member']))

        },
        methods: {
            logout(){
                if (this.$cookies.isKey("Token"))
                this.$cookies.remove("Token");
                this.token = [];
            },
        }
    }
</script>

<template>
    <Navbar
        v-on:logout="logout"
        :token="token"
    />
    <div class="container text-center px-0">
        <!-- {{token}} -->
        <!-- {{runs}} -->
        <h1>Vos scores</h1>
        <div v-if="runs.length > 0">
            <Run
            v-for="run, index in runs"
            :key="index"
            :run="run"
            />
        </div>
        <div v-else>
            <span>Vous n'avez pas encore de score enregistré</span>
        </div>
    </div>
</template>

<style>
</style>