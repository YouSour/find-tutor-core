import Vue from "vue";

// Element UI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en";
Vue.use(ElementUI, { locale, size: "small" });

// Data table
import { DataTables, DataTablesServer } from "vue-data-tables";
Vue.use(DataTables);
Vue.use(DataTablesServer);

// Font Awesome 5
import "/imports/ui/styles/fontawesome-all";

import WebFont from "webfontloader";
WebFont.load({
  google: {
    families: ["Cairo:regular,bold", "Lato:regular,bold,italic"]
  }
});

// Local Plugin
// import VueLodash from "/imports/ui/plugins/vue-lodash";
// Vue.use(VueLodash);
// import VueMoment from "/imports/ui/plugins/vue-moment";
// Vue.use(VueMoment);
// import VueNumeral from "/imports/ui/plugins/vue-numeral";
// Vue.use(VueNumeral);
