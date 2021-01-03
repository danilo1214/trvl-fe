<template>
  <div class="container" v-loading="!loaded">
    <template v-if="loaded">
      <div class="mt-5 d-flex">
        <div class="card m-5 shadow-lg col" style="max-width: 348px; min-width: 348px; max-height: 500px">
          <img :src="destination.image" alt="..." />
          <div class="card-body">
            <h5 class="card-title capitalize">
              Your trip in {{ destination.name }}, {{ destination.country }}
            </h5>
            <p class="card-text">Date From: {{ destination.date_from }}</p>

            <p class="card-text">Date To: {{ destination.date_to }}</p>

            <p class="card-text">Budget: ${{ destination.budget }}</p>
          </div>
          <div class="card-body bg-primary text-white">
            <h5 class="card-title capitalize">Temperature</h5>
            <p class="card-text">
              Current temperature:
              {{ Math.round(destination.temperature, 0) }}°C
            </p>
            <p class="card-text">
              Description: {{ destination.weather_description }}
            </p>
          </div>
        </div>

        <div class="row justify-content-around col">
          <div
            v-for="recommendation in recommendationsList"
            class="card col-4 shadow m-5"
            style="max-width: 450px"
            :key="recommendation.Title"
          >
            <div class="card-header">
              <h5 class="card-title capitalize">
                {{ recommendation.Title }}
              </h5>
            </div>
            <div class="card-body">
              <p class="card-text">Time: {{ recommendation.Time }}</p>

            <p class="card-text">Location: {{ recommendation.Location }}</p>

            <p class="card-text text-truncate">Description: ${{ recommendation.Description }}</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Destination",
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    ...mapGetters(["getDestination", "recommendations"]),
    id() {
      return this.$route.params.id;
    },
    destination() {
      const { id } = this;
      return this.getDestination(id)[0];
    },
    recommendationsList() {
      const { recommendations } = this;
      return Object.keys(recommendations).map((key) => {
        return recommendations[key];
      });
    },
  },
  methods: {
    ...mapActions(["loadRecommendations", "loadDestination"]),
    async load() {
      const { id } = this;
      this.loaded = false;
      await this.loadDestination({ id });
      await this.loadRecommendations({ destination_id: id });
      console.log("hiiii");
      this.loaded = true;
    },
  },
  created() {
    this.load();
  },
  watch: {
    $route() {
      this.load();
    },
  },
};
</script>

<style>
</style>