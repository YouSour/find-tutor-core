import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  khName: {
    type: String
  },
  enName: {
    type: String
  },
  path: {
    type: String,
    optional: true
  },
  colors: {
    type: Object,
    optional: true
  },
  "colors.firstColor": {
    type: String,
    optional: true
  },
  "colors.secondColor": {
    type: String,
    optional: true
  }
});
