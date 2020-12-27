<template>
  <div class="container">
    <h2 class="pb-2">It looks like you haven't entered your interests !</h2>

    <el-checkbox-group v-model="selected">
      <el-checkbox v-for="interest in interests" :label="interest.interest_id" :key="interest.id">{{
        interest.interest
      }}</el-checkbox>
    </el-checkbox-group>

    <el-steps :space="200" :active="0" finish-status="success">
      <el-step title="Interests"></el-step>
      <el-step title="User Info"></el-step>
      <el-step title="Done"></el-step>
    </el-steps>

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
    async postInterests(){
      const {selected} = this;
      await this.createInterests({selected}).then(data=>{
        console.log(data);
        this.$router.replace({name: "trips"});
      }).catch(err=>{
        console.log(err);
      });
    }
  }
};
</script>

<style>
</style>