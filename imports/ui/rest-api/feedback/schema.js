import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  teacherId: {
    type: String
  },
  studentId: {
    type: String
  },
  message: {
    type: String
  },
  createdDate: {
    type: Date,
    optional: true
  }
});
