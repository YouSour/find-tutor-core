import SimpleSchema from "simpl-schema";

export const TeacherAccountsInsertSchema = new SimpleSchema({
  fullName: {
    type: String
  },
  username: {
    type: String,
    min: 5,
    max: 20
  },
  email: {
    type: String
  },
  password: {
    type: String,
    min: 6
  },
  dob: {
    type: Date
  },
  gender: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  }
  // roles: {
  //   type: Array
  // },
  // "roles.$": {
  //   type: String
  // }
});

export const TeacherAccountsUpdateSchema = new SimpleSchema({
  _id: {
    type: String
  },
  fullName: {
    type: String
  },
  username: {
    type: String,
    min: 5,
    max: 20
  },
  email: {
    type: String
  },
  password: {
    type: String,
    min: 6,
    optional: true
  },
  dob: {
    type: Date
  },
  gender: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  }
  // roles: {
  //   type: Array
  // },
  // "roles.$": {
  //   type: String
  // }
});
