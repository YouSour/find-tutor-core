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
  "colors.primary": {
    type: String,
    optional: true
  },
  "colors.secondary": {
    type: String,
    optional: true
  }
});
