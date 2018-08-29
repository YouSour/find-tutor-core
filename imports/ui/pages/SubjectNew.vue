<template>
  <div>
    <el-dialog
      :visible="visible"
      :before-close="handleModalClose"
      title="New Subject"
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

import { insertSubject, findOneSubject } from "../rest-api/subjects/methods";

export default {
  name: "SubjectNew",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    //Custom validate
    // const validateKhName = (rule, value, callback) => {
    //   if (value) {
    //     findOneSubject
    //       .callPromise({ selector: { khName: value } })
    //       .then(result => {
    //         if (result) {
    //           callback(new Error("Kh Name exist"));
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

    return {
      loading: false,
      form: {
        khName: "",
        enName: "",
        path: "",
        firstColor: "",
        secondColor: ""
      },
      rules: {
        khName: [
          { required: true, message: "Kh Name is required" }
          // { validator: validateKhName, trigger: "blur" }
        ],
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
            khName: this.form.khName,
            enName: this.form.enName,
            path: this.form.path,
            colors: {
              firstColor: this.form.firstColor,
              secondColor: this.form.secondColor
            }
          };

          insertSubject
            .callPromise(doc)
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
