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
  spokenLanguage: {
    type: String,
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
  phoneNumber: {
    type: String,
    optional: true
  },
  type: {
    type: Array
  },
  "type.$": { type: String },
  typeOfCard: {
    type: String
  },
  cardNumber: {
    type: String
  },
  attachment: {
    type: String
  },
  experience: {
    type: String
  },
  status: {
    type: String
  },
  subjectId: {
    type: Array
  },
  "subjectId.$": { type: String },
  stars: {
    type: Number,
    optional: true
  },
  createdDate: {
    type: Date,
    optional: true
  }
});
