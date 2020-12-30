<template>
  <el-dialog
    custom-class="dialog-fade-enter-active"
    :visible="true"
    :before-close="closeModal"
  >
    <div>
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input v-model="data.name" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label class="form-label">Country</label>
        <input v-model="data.country" type="text" class="form-control" />
      </div>
      <label class="form-label">Dates</label>
      <div class="mb-3">
        <el-date-picker
          label="Date From"
          v-model="data.date_from"
          type="date"
          placeholder="Date From"
        >
        </el-date-picker>
      </div>
      <div class="mb-3">
        <el-date-picker
          label="Date To"
          v-model="data.date_to"
          type="date"
          placeholder="Date To"
        >
        </el-date-picker>
      </div>
      
      <label class="form-label">Budget</label>

      <div class="mb-3">
        <el-slider v-model="data.budget"></el-slider>
      </div>

      

      <button  class="btn btn-primary" @click="submit">Submit</button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "NewDestination",
  data() {
    return {
      data: {
        name: "",
        img: "",
        budget: 0,
        country: "",
        postal_code: 1000,
        date_from: null,
        date_to: null,
        country_code: "IDK"
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
      this.createDestination({data, tripId: Number(id)});
    }
  },
};
</script>

<style>
</style>