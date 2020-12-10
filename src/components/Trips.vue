<template>
  <div class="container">

      <div v-for="trip in trips" :key="trip.id" class="card" style="width: 18rem;">
          <div class="card-body">
              <h5 class="card-title">{{trip.title}}</h5>
              <p class="card-text">{{trip.description}}</p>
              <a @click="viewDestinations(trip)" class="card-link">View Destinations</a>
              <a @click="onEdit(trip)"  class="card-link">Edit</a>
          </div>
      </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    name: "Trips",
    computed: {
        ...mapGetters(["trips"])
    },
    methods:{
        onEdit(trip){
            this.$router.push(trip.id);
        },
        viewDestinations(trip){
            const {id} = trip;
            this.$router.replace({name: "trip", params: {id}})
        }
    }

}
</script>

<style>

</style>