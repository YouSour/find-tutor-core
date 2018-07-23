const dataTablesMixin = {
  data() {
    return {
      tableProps: {
        border: false,
        stripe: false,
        defaultSort: {
          prop: "code",
          order: "ascending"
        }
      },
      tableInitialQuery: {
        type: "init",
        page: 1,
        pageSize: 20,
        sortInfo: { prop: "tranDate", order: "descending" },
        filters: []
      }
    };
  },
  methods: {}
};

export default dataTablesMixin;
