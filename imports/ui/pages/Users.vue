<template>
  <div>
    <!--Modal Form-->
    <component
      :is="currentModal"
      :update-doc="updateDoc"
      :visible="modalVisible"
      @modal-close="handleModalClose"
    >
      </component>

      <!-- Toolbar -->
      <TableToolbar
        v-model="tableFilters"
        @new="addNew"
      >
        </TableToolbar>

        <!-- Datatable -->
        <data-tables
          v-loading="loading"
          :data="tableData"
          :table-props="tableProps"
          :filters="tableFilters"
        >
          <el-table-column
            v-for="title in tableTitles"
            :prop="title.prop"
            :label="title.label"
            :key="title.label"
            sortable="custom"
          >
            <template slot-scope="scope">
              <span :class="softRemoveClassName(scope.row.removed)">
                <span v-if="title.prop === 'CreatedAt'">
                  {{ $moment(scope.row.CreatedAt).format('DD/MM/YYY') }}
                </span>
                <span v-else>{{ scope.row[title.prop] }}</span>
              </span>
            </template>
            </el-table-column>

            <!-- Table Action -->
            <el-table-column
              label="Actions"
              align="center"
              fixed="right"
              width="70"
            >
              <template slot-scope="scope">
                <table-action
                  :actions="actionsList(scope.row)"
                  :row="scope.row"
                  @action-click="tableActionClick"
                ></table-action>
              </template>
              </el-table-column>
              </data-tables>

  </div>
</template>



<script>
// Mixin
import dataTablesMixin from "/imports/ui/mixins/data-tables";
// import softRemoveMixin from "/imports/ui/mixins/soft-remove";
// import restoreMixin from "/imports/ui/mixins/restore";
import removeMixin from "/imports/ui/mixins/remove";

// Table
import TableToolbar from "/imports/ui/components/TableToolbar.vue";
import TableAction from "/imports/ui/components/TableAction.vue";

import {
  findUser,
  removeUser
  // softRemoveBranch,
  // restoreBranch,
} from "../api/users/methods.js";

import userNew from "../pages/UserNew";
import userEdit from "../pages/UserEdit";

export default {
  name: "Users",
  components: { TableToolbar, TableAction, userNew },
  mixins: [dataTablesMixin, removeMixin],
  data() {
    return {
      loading: false,
      tableData: [],
      tableTitles: [
        { label: "Created Date", prop: "createdAt" },
        // { label: "ID", prop: "_id" },
        { label: "Name", prop: "username" },
        // { label: "Type", prop: "profile.type" },
        { label: "Status", prop: "profile" }
      ],
      tableFilters: [
        {
          prop: ["_id", "username", "profile.status"],
          value: ""
        }
      ],
      // Modal
      currentModal: null,
      modalVisible: false,
      updateDoc: null
    };
  },
  created() {
    // Extend data tables props (Mixin)
    this.tableProps.defaultSort = {
      prop: "_id",
      order: "ascending"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      findUser
        .callPromise({
          selector: {},
          options: {}
        })
        .then(result => {
          this.tableData = result;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          Notify.error({ message: error });
        });
    },
    // Add new
    addNew() {
      this.currentModal = userNew;
      this.$nextTick(() => {
        this.modalVisible = true;
      });
    },

    // Toble Formatter
    softRemoveClassName(removed) {
      return removed ? "soft-remove" : "";
    },

    // Table Action
    actionsList(row) {
      let actions = ["edit"];
      if (row.removed) {
        // actions.push('restore')
        // actions.push('remove')
      } else {
        // actions.push('softRemove')
        actions.push("remove");
      }

      return actions;
    },
    tableActionClick(command) {
      this[command.action](command.row);
    },
    edit(row) {
      this.updateDoc = row;
      this.currentModal = userEdit;
      this.$nextTick(() => {
        this.modalVisible = true;
      });
    },
    // softRemove(row) {
    //   this.$_softRemoveMixin({
    //     meteorMethod: softRemoveBranch,
    //     selector: { _id: row._id },
    //     successMethod: 'getData',
    //     loading: 'loading',
    //     title: row.title,
    //   })
    // },
    // restore(row) {
    //   this.$_restoreMixin({
    //     meteorMethod: restoreBranch,
    //     selector: { _id: row._id },
    //     successMethod: 'getData',
    //     loading: 'loading',
    //     title: row.title,
    //   })
    // },
    remove(row) {
      this.$_removeMixin({
        meteorMethod: removeUser,
        selector: { _id: row._id },
        successMethod: "getData",
        loading: "loading",
        title: row.title
      });
    },
    handleModalClose() {
      this.modalVisible = false;
      this.$nextTick(() => {
        this.currentModal = null;
        this.getData();
      });
    }
  }
};
</script>