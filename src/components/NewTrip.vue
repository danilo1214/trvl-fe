<template>
  <el-dialog
    custom-class="dialog-fade-enter-active"
    :visible="true"
    :before-close="closeModal"
  >
    <form>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="data.name" type="text" class="form-control" />
      </div>
      <label class="form-label">Dates</label>
      <div class="mb-3">
        <el-date-picker
          label="Date From"
          v-model="data.dateFrom"
          type="date"
          placeholder="Date From"
        >
        </el-date-picker>
      </div>
      <div class="mb-3">
        <el-date-picker
          label="Date To"
          v-model="data.dateTo"
          type="date"
          placeholder="Date To"
        >
        </el-date-picker>
      </div>
      <label class="form-label">N coord</label>

      <div class="mb-3">
        <el-slider v-model="data.n"></el-slider>
      </div>
      <label class="form-label">E coord</label>

      <div class="mb-3">
        <el-slider v-model="data.e"></el-slider>
      </div>
      <label class="form-label">Budget</label>

      <div class="mb-3">
        <el-slider v-model="data.budget"></el-slider>
      </div>

      

      <button  class="btn btn-primary" @click="submit">Submit</button>
    </form>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "NewTrip",
  data() {
    return {
      data: {
        name: "",
        n: 0,
        e: 0,
        img: "",
        budget: 0,
        dateFrom: null,
        dateTo: null,
      },
    };
  },
  computed: {
    id(){
      return this.$route.params.id;
    }
  },
  methods: {
    ...mapActions(["createDestination"]),
    closeModal() {
      this.$router.push(".");
    },
    submit(){
      const {data, id} = this;
      this.createDestination({data, id});
    }
  },
};
</script>

<style>
</style>