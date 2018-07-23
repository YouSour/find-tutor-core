<template>
  <span>
    <el-dropdown
      v-if="actions.length"
      trigger="click"
      @command="handleTableAction"
    >
      <span class="el-dropdown-link">
        <i class="fa fa-bars"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(action, index) in actions"
          :key="index"
          :command="{action, row}"
        >
          <!-- {{ $_.startCase(action) }} -->
          {{action}}
          </el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>
  </span>
</template>

<script>
export default {
  name: "TableAction",
  props: {
    row: {
      type: Object,
      default: null
    },
    actions: {
      type: Array,
      default() {
        return ["edit", "softRemove", "restore", "remove"];
      }
    }
  },
  methods: {
    handleTableAction(command) {
      this.$emit("action-click", command);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
