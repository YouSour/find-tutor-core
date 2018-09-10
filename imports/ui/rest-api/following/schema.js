import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  studentId: {
    type: String
  },
  teacherId: {
    type: String
  },
  createdDate: {
    type: Date,
    optional: true
  }
});
