import SimpleSchema from "simpl-schema";

export default new SimpleSchema({
  postId: {
    type: String
  },
  teacherId: {
    type: String,
    optional: true
  },
  studentId: {
    type: String,
    optional: true
  },
  comment: {
    type: String,
  },
  createdDate: {
    type: Date,
    optional: true
  },
  updatedDate: {
    type: Date,
    optional: true
  }
});
