import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  like: {
    type: Boolean
  },
  likeCount: {
    type: Number
  },
  photo: {
    type: String
  },
  price: {
    type: SimpleSchema.Integer
  },
  discount: {
    type: Number
  },
  duration: {
    type: Number
  },
  locations: {
    type: Array,
    optional: true
  },
  "locations.$": { type: String },
  studentLimit: {
    type: Number
  },
  subjectId: {
    type: String
  }
});
