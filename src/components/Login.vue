<template>
  <div class="columns" style="margin-top: 100px">
    <div class="column col-2 centered">
      <g-signin-button
        :params="googleSignInParams"
        @success="onGoogleSignInSuccess"
        @error="onGoogleSignInError"
      >
        <button class="btn btn-block btn-success">Google Signin</button>
      </g-signin-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapActions } from 'vuex';
export default {
  name: "Login",
  data() {
    return {
      googleSignInParams: {
        client_id:
          "720686768451-gi38hfhqsi917ll3hv59pf432to3lb0s.apps.googleusercontent.com",
      },
    };
  },
  methods: {
    ...mapActions(["setToken"]),
    onGoogleSignInSuccess(resp) {
      const token = resp.xc.access_token;
      this.setToken({token});
      axios
        .post("http://127.0.0.1:8000/auth/google/", {
          access_token: token,
        })
        .then((resp) => {
          this.user = resp.data.user;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    onGoogleSignInError(error) {
      console.log("OH NOES", error);
    },
  },
};
</script>