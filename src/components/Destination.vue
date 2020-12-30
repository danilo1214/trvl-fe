<template>
  <div class="container" v-loading="!loaded">
      <template v-if="loaded">
          <h1>{{ destination.name }}</h1>
      </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Destination",
  data() {
    return {
        loaded: false
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
    }
  },
  methods: {
    ...mapActions(["loadRecommendations", "loadDestination"]),
    async load() {
      const { id } = this;
      this.loaded = false;
      await this.loadDestination({id});
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