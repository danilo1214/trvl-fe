<template>
  <div id="app" v-loading="!loaded">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">TRVLAPP</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/trips" class="nav-link">Trips</router-link>
      </li>
    </ul>
  </div>
</nav>
    <div class="main">
      <router-view v-if="loaded" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'App',
  data () {
    return {
      loaded: true,
      logged: false
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["loadTrips", "auth", "setToken", "loadInterests"]),
    async init(){
      this.loaded = false;
      await this.auth().then(async ()=>{
        this.logged = true;
        await this.loadTrips();
        await this.loadInterests();
        const {interests} = this.user;
        if(!this.$route.name){
        this.$router.replace({name: "trips"});
        }
        if(!interests.length){
          this.$router.replace({name: "interests"});
          return;
        }
        if(!this.user.age){
          this.$router.replace({name: "user-info"});
        }
      }).catch(err=>{
        console.log(err);
        this.setToken({token: null});
        this.$router.replace({name: "login"});
        this.logged = false;
      });
      this.loaded = true;

      


    }
  },
  created(){
    this.init();
  },
  watch: {
    $route(){
      this.init()
    }
  }
}
</script>

<style>

</style>