import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  teacherId: {
    type: String
  },
  studentId: {
    type: String
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  }
});
