import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  khName: {
    type: String,
    optional: true
  },
  enName: {
    type: String,
    optional: true
  },
  gender: {
    type: String,
    optional: true
  },
  dob: {
    type: Date,
    optional: true
  },
  email: {
    type: String,
    optional: true
  },
  address: {
    type: String,
    optional: true
  },
  locations: {
    type: Array,
    optional: true
  },
  "locations.$": { type: String },
  phoneNumber: {
    type: String,
    optional: true
  },
  createdDate: {
    type: Date,
    optional: true
  }
});
