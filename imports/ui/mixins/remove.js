import Msg from "/imports/ui/lib/message";
import Notify from "/imports/ui/lib/notify";

const removeMixin = {
  methods: {
    $_removeMixin({
      meteorMethod,
      selector,
      successMethod,
      successParams,
      loading,
      title
    }) {
      selector = selector || {};
      successParams = successParams || {};
      loading = loading ? this[loading] : "";
      title = title ? ` [${title}]` : "";

      this.$confirm(
        `This will immediately remove ${title}. Continue?`,
        "Warning",
        {
          type: "warning"
        }
      )
        .then(() => {
          loading = true;

          meteorMethod
            .callPromise(selector)
            .then(result => {
              loading = false;
              successMethod ? this[successMethod](successParams) : "";
              Msg.success();
            })
            .catch(error => {
              loading = false;
              Notify.error({ message: error });
            });
        })
        .catch(() => {
          Msg.warning("Your transaction is canceled");
        });
    }
  }
};

export default removeMixin;
