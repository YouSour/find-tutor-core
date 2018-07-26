import moment from "moment";

const VueMoment = {
  install(Vue, options) {
    Vue.prototype.$moment = moment;

    Vue.mixin({
      mounted() {
        // Just tell you that it is mounted
        console.log("VueMoment");
      }
    });

    if (typeof window !== "undefined" && window.Vue) {
      window.Vue.use(VueMoment);
    }
  }
};

export default VueMoment;
