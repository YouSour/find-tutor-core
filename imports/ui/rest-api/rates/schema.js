import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  teacherId: {
    type: String
  },
  studentId: {
    type: String
  },
  value: {
    type: Number
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
