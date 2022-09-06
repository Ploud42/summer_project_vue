<script>
  import axios from 'axios';
  import Character from './Character.vue';
  import Navbar from './Navbar.vue';
  import Game from './Game.vue';

  export default {
    name: 'Login',
    components: {
      Character,
        Navbar,
        Game,
    },
    data(){
        return {
          result: [],
          email: "",
          password: "",
          errorMessage: ""
        }
    },
    mounted(){

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
      }
    }
  }
</script>

<template>
  <Navbar/>
<form @submit.prevent="login" class="w-50 mx-auto text-center">
    <div>{{result}}</div>

    <h1 class="h3 mb-3 font-weight-normal">Veuillez vous identifier</h1>
    <label for="inputEmail">Email</label>
    <input type="email" name="email" id="inputEmail" v-model="email" class="form-control w-75 mx-auto" autocomplete="email" required autofocus>
    <label for="inputPassword">Mot de passe</label>
    <input type="password" name="password" id="inputPassword" v-model="password" class="form-control w-75 mx-auto" autocomplete="current-password" required>

    <input type="hidden" name="_csrf_token"
           value="{{ csrf_token('authenticate') }}"
    >
    <div class="text-center text-danger">{{errorMessage}}</div>
    <button class="btn btn-lg btn-primary mt-3" type="submit">Se connecter</button>
</form>
</template>

<style>

</style>