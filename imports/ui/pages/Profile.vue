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
          :label-position="labelPosition"
          ref="form"
          :model="form"
          label-width="120px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="USER NAME">
                <el-input
                  v-model="form.username"
                  size="large"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Full NAME">
                <el-input
                  v-model="form.fullName"
                  size="large"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="E-MAIl">
                <el-input
                  v-model="form.email"
                  size="large"
                  :disabled="true"
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
          <!-- <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >Create</el-button>
              <el-button>Cancel</el-button>
          </el-form-item> -->
          <!-- {{user}} -->
          </el-form>

      </el-col>

    </el-row>
  </div>
</template>

<script>
import { findOneUser } from "../api/users/methods.js";
import moment from "moment";
import Notify from "/imports/ui/lib/notify";
export default {
  data() {
    return {
      labelPosition: "top",
      form: {
        username: "",
        fullName: "",
        email: "",
        role: "",
        createdDate: null
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
          // console.log(result);
          // this.tableData = result;
          this.form.username = result.username;
          this.form.fullName = result.profile.fullName;
          this.form.email = result.emails[0].address;
          this.form.role = result.roles[0];
          this.form.createdDate = moment(result.createdAt).format(
            "DD/MM/YYYY HH:mm:ss"
          );
        })
        .catch(error => {
          Notify.error({ message: error });
        });
    },
    onSubmit() {
      console.log("submit!");
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
