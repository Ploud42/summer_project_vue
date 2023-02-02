<script> 
    import Navbar from './Navbar.vue';

    export default {
        name: 'About',
        components: {
            Navbar,
        },
        data(){
            return {
            token: [],
            }
        },
        mounted(){
            if (this.$cookies.isKey("Token")){
                this.token = jwt_decode(this.$cookies.get("Token"));
            }
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
    <div class="container">
        <h1 class="text-center pb-5">A propos</h1>
        <p>
            Suite à un projet abordé lors de ma formation, j'ai voulu explorer la faisabilité d'un jeu vidéo type RPG en 2D n'utilisant que des technologies web.
            Dans le but d'approfondir ma maitrise de Symfony et de Vuejs, et parce que ces frameworks présentent de réels intérêts pour mon projet, j'ai décidé de les utiliser tous les deux.
            En effet, Vuejs permet une intégration facilitée sur mobile en pseudo-application, et Symfony permet la création et gestion rapide d'une base de données, d'un CRUD, et la mise en place d'une API via API Platform.
            L'ambition est aussi de créer mes propres assets pour le jeu : Dessins / animations / décors via un site de pixelart gratuit : Pixilart. 
        </p>
        <p>
            Un accès admin à la partie Symfony permet d'ajouter les héros qu'incarnent les utilisateurs, ainsi que les créatures qu'ils affrontent.
            Le site en lui-même propose de se connecter / créer un compte, afin de pouvoir sélectionner un héros. L'accès aux informations sensibles de l'API est sécurisé par l'utilisation d'un Json Web Token (JWT).
            Une fois le héros sélectionné, le jeu démarre et propose d'affronter des monstres de plus en plus forts. Toutes les données sont récupérées via l'API, et le jeu en lui-même est géré en Javascript.
            Si un combat est perdu ou tous les adversaires vaincus, le score est sauvegardé en base de donnée, et l'utilisateur aura alors accès à son historique des parties dans une section “Mes scores”.
        </p>
        <p>
            Le jeu est en Alpha et les assets sont en constante évolution/création. Des images prises sur internet font office d'exemple en attendant. Toute ressemblance avec des faits / personnages réels ou fictifs est une coïncidence.
        </p>
    </div>
</template>

<style>

</style>