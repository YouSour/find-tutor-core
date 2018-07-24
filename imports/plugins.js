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
    families: ["Anton:regular,bold", "Lato:regular,bold,italic"]
  }
});
