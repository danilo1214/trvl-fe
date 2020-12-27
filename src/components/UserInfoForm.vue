<template>
  <div class="container">
    <h2 class="pb-2">Just one more step!</h2>

    <div class="mb-3">
      <label class="form-label">Age</label>
      <input v-model="user.age" class="form-control" type="number" />
    </div>

    <div class="mb-3">
      <el-radio v-model="user.gender" label="M">Male</el-radio>
      <el-radio v-model="user.gender" label="2">Female</el-radio>
    </div>

    <div class="mb-3">
      <el-checkbox label="Recieve Emails">
        {{ user.recieve_emails }}
      </el-checkbox>
    </div>

    <el-steps :space="200" :active="1" finish-status="success">
      <el-step title="Interests"></el-step>
      <el-step title="User Info"></el-step>
      <el-step title="Done"></el-step>
    </el-steps>

    <button type="button" class="btn btn-primary" @click="postInfo">
      Next
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "UserInfo",
  data() {
    return {
      user: {
        gender: "M",
        age: 0,
        recieve_emails: true,
      },
    };
  },
  methods: {
    ...mapActions(["createInfo"]),
    async postInfo() {
      const { user } = this;
      await this.createInfo({ user })
        .then((data) => {
          console.log(data);
          this.$router.replace({ name: "trips" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>