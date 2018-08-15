import SimpleSchema from "simpl-schema";

export const UserInsertSchema = new SimpleSchema({
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
  type: {
    type: String
  },
  status: {
    type: String
  }
  // branchPermissions: {
  //   type: Array
  // },
  // "branchPermissions.$": {
  //   type: String
  // },
  // roles: {
  //   type: Array
  // },
  // "roles.$": {
  //   type: String
  // }
});

export const UserUpdateSchema = new SimpleSchema({
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
  type: {
    type: String,
    optional: true
  },
  status: {
    type: String,
    optional: true
  }
  // branchPermissions: {
  //   type: Array
  // },
  // "branchPermissions.$": {
  //   type: String
  // },
  // roles: {
  //   type: Array
  // },
  // "roles.$": {
  //   type: String
  // }
});
