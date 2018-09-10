import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  teacherId: {
    type: String,
    optional: true
  },
  studentId: {
    type: String,
    optional: true
  },
  name: {
    type: String,
    optional: true
  },
  type: {
    type: String
  },
  comment: {
    type: String
  },
  status: {
    type: String
  },
  createdAt: {
    type: Date,
    optional: true
  }
});
