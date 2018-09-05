import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  like: {
    type: Boolean,
    optional: true
  },
  likeCount: {
    type: Number
  },
  grade: {
    type: String,
    optional: true
  },
  photo: {
    type: String,
    optional: true
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
    type: Object,
    optional: true
  },
  "locations.longitude": { type: String },
  "locations.latitude": { type: String },
  studentLimit: {
    type: Number
  },
  subjectId: {
    type: String
  },
  date: {
    type: String
  },
  statTime: {
    type: String
  },
  endTime: {
    type: String
  },
  status: {
    type: String,
    optional: true
  },
  memo: {
    type: String,
    optional: true
  }
});
