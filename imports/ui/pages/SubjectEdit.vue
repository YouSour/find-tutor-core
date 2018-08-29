<template>
  <div>
    <el-dialog
      :visible="visible"
      :before-close="handleModalClose"
      title="Edit Subject"
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
              label="Kh Name"
              prop="khName"
            >
              <el-input v-model="form.khName"></el-input>
              </el-form-item>
              <el-form-item
                label="En Name"
                prop="enName"
              >
                <el-input v-model="form.enName"></el-input>
                </el-form-item>

          </el-col>

          <el-col :span="12">
            <el-form-item
              label="Path"
              prop="path"
            >
              <el-input v-model="form.path"></el-input>
              </el-form-item>
              <el-form-item
                label="Colors"
                prop="firstColor"
              >
                <el-color-picker v-model="form.firstColor"></el-color-picker>
                <el-color-picker v-model="form.secondColor"></el-color-picker>
                </el-form-item>
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

import { validateUserExist } from "../../utils/validate-methods";
import { findOneUser, updateUser } from "../api/users/methods";
import { updateSubject } from "../rest-api/subjects/methods";

export default {
  name: "SubjectEdit",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    updateDoc: {
      type: Object,
      default: null
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

    return {
      loading: false,
      form: this.updateDoc,
      rules: {
        khName: [{ required: true, message: "Kh Name is required" }],
        enName: [{ required: true, message: "En Name is required" }]
      }
    };
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;

          // Make data
          const doc = {
            _id: this.form._id,
            khName: this.form.khName,
            enName: this.form.enName,
            path: this.form.path,
            colors: {
              firstColor: this.form.firstColor,
              secondColor: this.form.secondColor
            }
          };

          updateSubject
            .callPromise(doc)
            .then(result => {
              if (result) {
                this.loading = false;
                Msg.success();
                this.handleModalClose();
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
