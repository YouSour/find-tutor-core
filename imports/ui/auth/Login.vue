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
        <el-form
          v-loading="loading"
          ref="form"
          :model="form"
          :rules="rules"
        >
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item
                label="Name"
                prop="username"
              >
                <el-input
                  size="large"
                  v-model="form.username"
                ></el-input>
                  </el-form-item>

                  <el-form-item
                    label="Password"
                    prop="password"
                  >
                    <el-input
                      type="password"
                      size="large"
                      v-model="form.password"
                    ></el-input>
                      </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button
                size="large"
                :loading="loading"
                @click="submitForm"
                class="btn"
              >
                Log In
                </el-button>
            </el-col>
          </el-row>

          </el-form>

      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "Username is required" }],
        password: [{ required: true, message: "Password is required" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;

          this.$store.dispatch("submitLoginForm", this.form);
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs["form"].resetFields();
    }
  }
};
</script>
<style>
.btn {
  width: 100% !important;
  margin-top: 10px !important;
  margin-bottom: 5px !important;
  border: none;
  background: #07a7e3;
  background: -moz-linear-gradient(-45deg, #07a7e3 0%, #32dac3 100%);
  background: -webkit-linear-gradient(-45deg, #07a7e3 0%, #32dac3 100%);
  background: linear-gradient(135deg, #07a7e3 0%, #32dac3 100%);
  text-transform: uppercase;
  color: #fff !important;
  cursor: pointer;
}
.btn:hover {
  color: #fff;
  background: #06b9fa;
  background: -moz-linear-gradient(-45deg, #06b9fa 0%, #32dac3 100%);
  background: -webkit-linear-gradient(-45deg, #06b9fa 0%, #32dac3 100%);
  background: linear-gradient(135deg, #06b9fa 0%, #32dac3 100%);
}
.btn:active,
:visited {
  color: #fff !important;
}
</style>
