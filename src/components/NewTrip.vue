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
        <label class="form-label">Description</label>
        <input v-model="data.description" type="text" class="form-control" />
      </div>

      <button class="btn btn-primary" @click="submit">Save</button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "NewTrip",
  data() {
    return {
      data: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    ...mapActions(["createTrip"]),
    closeModal() {
      console.log("?");
      this.$router.push(".");
    },
    submit() {
      const { data } = this;
      this.createTrip({data});
    },
  },
};
</script>

<style>
#newTripButton {
  position: absolute;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  z-index: 400;
}
</style>