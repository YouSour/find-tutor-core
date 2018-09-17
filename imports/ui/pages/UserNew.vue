<template>
  <div>
    <el-dialog
      :visible="visible"
      :before-close="handleModalClose"
      title="New User"
      width="60%"
    >
      <el-form
        v-loading="loading"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="170px"
        label-position="left"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item
              label="Full name"
              prop="fullName"
            >
              <el-input v-model="form.fullName"></el-input>
              </el-form-item>
              <el-form-item
                label="Username"
                prop="username"
              >
                <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item
                  label="Email"
                  prop="email"
                >
                  <el-input v-model="form.email"></el-input>
                  </el-form-item>
                  <el-form-item
                    label="Password"
                    prop="password"
                  >
                    <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item
                      label="Confirm password"
                      prop="confirmPassword"
                    >
                      <el-input v-model="form.confirmPassword"></el-input>
                      </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="Status"
              prop="status"
            >
              <el-select
                v-model="form.status"
                style="width: 100%"
              >
                <el-option
                  v-for="item in statusOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                  </el-option>
                  </el-select>
                  </el-form-item>

                  <el-form-item
                    label="Type"
                    prop="type"
                  >
                    <el-select
                      v-model="form.type"
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in typeOpts"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                        </el-option>
                        </el-select>
                        </el-form-item>

                        <!-- <el-form-item
                    label="Roles"
                    prop="roles"
                  >
                    <el-select
                      v-model="form.roles"
                      multiple
                      style="width: 100%"
                    >
                      <el-option
                        v-for="item in roleOpts"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                        </el-option>
                        </el-select>
                        </el-form-item> -->

                        <!-- <el-form-item
                          label="Branch permissions"
                          prop="branchPermissions"
                        >
                          <el-select
                            v-model="form.branchPermissions"
                            multiple
                            style="width: 100%"
                          >
                            <el-option
                              v-for="item in branchPermissionOpts"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                              </el-option>
                              </el-select>
                              </el-form-item> -->

          </el-col>
        </el-row>
        </el-form>
        <span slot="footer">
          <el-button
            type="primary"
            @click="submitForm"
          >
            Save
            </el-button>
            <el-button @click="handleModalClose">Cancel</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import Msg from "/imports/ui/lib/message";
import Notify from "/imports/ui/lib/notify";
// Libs
import LookupValue from "../lib/lookup-value";

// import { lookupRole, lookupBranch } from "../../utils/lookup-methods";
import { validateUserExist } from "../../utils/validate-methods";
import { insertUser } from "../api/users/methods";

export default {
  name: "UserNew",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // Custom validate
    // const validateUsername = (rule, value, callback) => {
    //   if (value) {
    //     validateUserExist
    //       .callPromise({ selector: { username: value } })
    //       .then(result => {
    //         if (result) {
    //           callback(new Error("Username exist"));
    //         } else {
    //           callback();
    //         }
    //       })
    //       .catch(error => {
    //         Notify.error({ message: error });
    //       });
    //   }
    // };

    // const validateEmail = (rule, value, callback) => {
    //   if (value) {
    //     validateUserExist
    //       .callPromise({
    //         selector: { emails: { $elemMatch: { address: value } } }
    //       })
    //       .then(result => {
    //         if (result) {
    //           callback(new Error("Email exist"));
    //         } else {
    //           callback();
    //         }
    //       })
    //       .catch(error => {
    //         Notify.error({ message: error });
    //       });
    //   }
    // };

    const validatePassword = (rule, value, callback) => {
      if (value) {
        if (this.form.confirmPassword !== "") {
          this.$refs.form.validateField("confirmPassword");
        }
        callback();
      }
    };

    const validateConfirmPassword = (rule, value, callback) => {
      if (value && value !== this.form.password) {
        callback(new Error("The password don't match!"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      roleOpts: [],
      statusOpts: LookupValue.status,
      typeOpts: LookupValue.type,
      branchPermissionOpts: [],
      form: {
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: "",
        status: ""
        // branchPermissions: [],
        // roles: []
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
        ],
        type: [{ required: true, message: "Type is required" }],
        status: [{ required: true, message: "Status is required" }],
        password: [
          { required: true, message: "Password is required" },
          {
            min: 6,
            message: "Length should be greater than 6",
            trigger: "blur"
          },
          { validator: validatePassword, trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "Confirm password is required" },
          {
            min: 6,
            message: "Length should be greater than 6",
            trigger: "blur"
          },
          { validator: validateConfirmPassword, trigger: "blur" }
        ]
        // branchPermissions: [
        //   { required: true, message: "Branches is required" }
        // ],
        // roles: [{ required: true, message: "Branches is required" }]
      }
    };
  },
  mounted() {
    // this.getRoles();
  },
  methods: {
    // getRoles() {
    //   lookupRole
    //     .callPromise()
    //     .then(result => {
    //       this.roleOpts = result;
    //     })
    //     .catch(error => {
    //       Notify.error({ message: error });
    //     });
    // },
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;

          // Make data
          const data = _.clone(this.form);
          delete data.confirmPassword;

          insertUser
            .callPromise({ user: data })
            .then(result => {
              if (result) {
                this.loading = false;
                Msg.success();
                this.resetForm();
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
    },
    resetForm() {
      this.$refs["form"].resetFields();
    },
    handleModalClose() {
      this.$emit("modal-close");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~imports/ui/styles/main.scss";
</style>
