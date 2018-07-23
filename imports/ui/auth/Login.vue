<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="login-logo">
        <a href="#">
          <img
            src="images/icon/logo.png"
            alt="CoolAdmin"
          >
        </a>
      </div>
      <div class="login-form">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label>Username</label>
            <input
              class="au-input au-input--full"
              v-model="formData.username"
            />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input
              class="au-input au-input--full"
              v-model="formData.password"
            />
          </div>
          <button class="au-btn au-btn--block m-b-20">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch("submitLoginForm", this.formData);
    }
  }
};
</script>
