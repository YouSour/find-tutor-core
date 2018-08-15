<template>
  <div>

    <el-row>
      <el-col :span="24">
        <h3>Your Profile</h3>
        <hr>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }">
          <img
            src="https://i.pinimg.com/736x/4b/2e/bf/4b2ebf54d49a65ea34d57e882b9d783a--girls-generation-beautiful-celebrities.jpg"
            class="image"
          >

            <!-- <div style="padding: 14px;">
              <span>Sunny</span>
              <div class="bottom clearfix">
                <time class="time"></time>
                <el-button
                  type="text"
                  class="button"
                >Operating button</el-button>
              </div>
            </div> -->
        </el-card>
      </el-col>
      <el-col :span="18">

        <el-form
          v-loading="loading"
          :label-position="labelPosition"
          ref="form"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item
                label="USER NAME"
                prop="username"
              >
                <el-input
                  v-model="form.username"
                  size="large"
                ></el-input>
                  </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="Full NAME"
                prop="fullName"
              >
                <el-input
                  v-model="form.fullName"
                  size="large"
                ></el-input>
                  </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item
                label="E-MAIl"
                prop="email"
              >
                <el-input
                  v-model="form.email"
                  size="large"
                ></el-input>
                  </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Role">
                <el-input
                  v-model="form.role"
                  size="large"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Created Date">
                <el-input
                  v-model="form.createdDate"
                  size="large"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >Update</el-button>
              <el-button>Cancel</el-button>
          </el-form-item>
          </el-form>

      </el-col>

    </el-row>
  </div>
</template>

<script>
import { findOneUser, updateUser } from "../api/users/methods.js";
import _ from "lodash";
import moment from "moment";
import Notify from "/imports/ui/lib/notify";
import Msg from "/imports/ui/lib/message";
export default {
  data() {
    return {
      loading: false,
      labelPosition: "top",
      form: {
        // _id: "",
        // username: "",
        // fullName: "",
        // email: "",
        // role: "",
        // createdDate: null,
        // type: "",
        // status: "",
        // password: "",
        // confirmPassword: ""
      },
      rules: {
        fullName: [{ required: true, message: "Full name is required" }],
        username: [
          { required: true, message: "Username is required" },
          {
            min: 5,
            max: 20,
            message: "Length should be 5 to 20",
            trigger: "blur"
          }
          // { validator: validateUsername, trigger: "blur" }
        ],
        email: [
          { required: true, message: "Email is required" },
          { type: "email", message: "Email is not a valid email" }
          // { validator: validateEmail, trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.user();
  },
  methods: {
    user() {
      let userId = this.$store.state.auth.user._id;
      findOneUser
        .callPromise({
          _id: userId
        })
        .then(result => {
          this.form = {
            _id: result._id,
            username: result.username,
            fullName: result.profile.fullName,
            email: result.emails[0].address,
            role: result.roles[0],
            createdDate: moment(result.createdAt).format("DD/MM/YYYY HH:mm:ss"),
            type: "",
            status: "",
            password: ""
          };

          // this.form._id = result._id;
          // this.form.username = result.username;
          // this.form.fullName = result.profile.fullName;
          // this.form.email = result.emails[0].address;
          // this.form.role = result.roles[0];
          // this.form.createdDate = moment(result.createdAt).format(
          //   "DD/MM/YYYY HH:mm:ss"
          // );
        })
        .catch(error => {
          Notify.error({ message: error });
        });
    },
    onSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;

          // Make data
          let user = _.clone(this.form);
          delete user.role;
          delete user.createdDate;

          console.log(user);
          updateUser
            .callPromise({ user })
            .then(result => {
              if (result) {
                console.log(result);
                this.loading = false;
                Msg.success();
              }
            })
            .catch(error => {
              this.loading = false;
              Notify.error({ message: error.reason });
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
/* .time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
} */

.image {
  width: 100%;
  display: block;
}

/* .clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
} */
</style>
