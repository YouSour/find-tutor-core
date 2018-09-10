import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  senderId: {
    type: String,
    optional: true
  },
  teacherId: {
    type: String,
    optional: true
  },
  studentId: {
    type: String,
    optional: true
  },
  message: {
    type: String
  },
  createdDate: {
    type: Date,
    optional: true
  }
});
