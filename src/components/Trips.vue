<template>
  <div class="container pt-5">
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div v-for="trip in trips" :key="trip.id" class="card p-2 m-5 col" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">{{ trip.name }}</h5>
        <p class="card-text">{{ trip.description }}</p>
        <a :href="`#/trip/${trip.trip_id}`" class="card-link">View Destinations</a>
      </div>
    </div>
    </div>
    

    <el-button
        id="newTripButton"
        type="primary"
        circle
        small
        @click="addNew"
      >
        <span class="fas fa-plus"></span>
 </el-button>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Trips",
  computed: {
    ...mapGetters(["trips"]),
  },
  methods: {
    addNew() {
      this.$router.replace({name: "new-trip"});
    },
    onEdit(trip) {
      this.$router.push(trip.id);
    },
    viewDestinations(trip) {
      const { id } = trip;
      this.$router.replace({ name: "trip", params: { id } });
    },
  },
};
</script>

<style>
</style>