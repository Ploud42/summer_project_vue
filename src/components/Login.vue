<script>
  import axios from 'axios';
  import Navbar from './Navbar.vue';
  import jwt_decode from 'jwt-decode';

  export default {
    name: 'Login',
    components: {
        Navbar,
    },
    data(){
        return {
          result: [],
          token: [],
          email: "",
          password: "",
          errorMessage: ""
        }
    },
    mounted(){
      if (this.$cookies.isKey("Token")){
        this.token = jwt_decode(this.$cookies.get("Token"));
      }
    },
    methods: {
      async login() {
        this.result = null;
        this.errorMessage = "";
        await axios
          .post('http://localhost:8000/authentication_token',
          {
            email: this.email,
            password: this.password
          },
          {

          })
          .then(response => (
            this.result = response.data,
            console.log(response.status)
            )
          )
          .catch( (e) => {
              this.errorMessage = "Identifiants invalides";
              console.log(e.message);
            }
          )
        console.log(this.result);
        if (this.result){
          console.log(this.result);
          let d = new Date();
          d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
          let expires = "expires=" + d.toUTCString();
          document.cookie =
            "Token=" + this.result.token + ";" + expires + ";";
          this.$router.push("/");
        }
      },
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
<form @submit.prevent="login" class="w-50 mx-auto text-center">
    <h1 class="h3 mt-3 mb-3 font-weight-normal">Veuillez vous identifier</h1>
    <label for="inputEmail">Email</label>
    <input type="email" name="email" id="inputEmail" v-model="email" class="form-control w-75 mx-auto" autocomplete="email" required autofocus>
    <label for="inputPassword">Mot de passe</label>
    <input type="password" name="password" id="inputPassword" v-model="password" class="form-control w-75 mx-auto" autocomplete="current-password" required>

    <input type="hidden" name="_csrf_token"
           value="{{ csrf_token('authenticate') }}"
    >
    <div class="text-center text-danger">{{errorMessage}}</div>
    <button class="btn btn-lg btn-primary mt-3" type="submit">Se connecter</button>
    <p class="mt-3">Pas encore inscrit? Cliquez <a href="http://localhost:8000/register">ici</a></p>
</form>
</template>

<style>

</style>