<template>
  <div class="table-toolbar">
    <el-row>
      <el-col :span="colSpan.action">
        <!-- Action -->
        <slot name="action">
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="$emit('new')"
          >
            New
            </el-button>
        </slot>
      </el-col>
      <el-col
        :span="colSpan.filter"
        :offset="colSpanOffset"
        class="text-right"
      >
        <!-- Filter -->
        <slot name="filter">
          <el-input v-model="filter"></el-input>
        </slot>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TableToolbar",
  props: {
    value: {
      type: Array,
      default: () => [{ value: "" }]
    },
    colSpan: {
      type: Object,
      default: () => ({ action: 16, filter: 4 })
    }
  },
  data() {
    return {
      filter: this.value[0].value,
      colSpanOffset: 24 - (this.colSpan.action + this.colSpan.filter)
    };
  },
  watch: {
    filter(val) {
      this.value[0].value = val;
      this.$emit("input", this.value);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
