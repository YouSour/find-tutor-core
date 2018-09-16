import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  postId: {
    type: String
  },
  studentId: {
    type: String,
    optional: true
  },
  createdDate: {
    type: Date,
    optional: true
  }
});
