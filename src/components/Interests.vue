<template>
  <div class="container">
    <h2 class="pb-2">It looks like you haven't entered your interests !</h2>

    <el-checkbox-group v-model="selected">
      <el-checkbox v-for="interest in interests" :label="interest.interest_id" :key="interest.id">{{
        interest.interest
      }}</el-checkbox>
    </el-checkbox-group>

    <button type="button" class="btn btn-primary" @click="postInterests">Next</button>

  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Interests",
  data(){
    return {
      selected: []
    }
  },
  computed: {
    ...mapGetters(["interests"]),
  },
  methods: {
    ...mapActions(["createInterests"]),
    postInterests(){
      const {selected} = this;
      this.createInterests({selected});
    }
  }
};
</script>

<style>
</style>