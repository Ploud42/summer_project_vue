<script>
    import axios from 'axios';
    import Navbar from './Navbar.vue';
    import jwt_decode from 'jwt-decode';

    export default {
        name: 'Score',
        components: {
            Navbar,
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
  <!-- {{token}} -->
  {{runs}}
  <p>Test</p>

</template>

<style>

</style>