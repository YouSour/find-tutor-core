import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
// import rateLimit from "../../modules/rate-limit";

import { UserInsertSchema, UserUpdateSchema } from "./users";

// Find
export const findUsers = new ValidatedMethod({
  name: "Users.methods.find",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    selector: {
      type: Object,
      blackbox: true,
      optional: true
    },
    options: {
      type: Object,
      blackbox: true,
      optional: true
    }
  }).validator(),
  run({ selector, options }) {
    if (Meteor.isServer) {
      return Meteor.users.find(selector, options).fetch();
      // return Meteor.users.find().fetch();
    }
  }
});

// Find One
export const findOneUser = new ValidatedMethod({
  name: "Users.methods.findOneUser",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return Meteor.users.findOne({ _id });
    }
  }
});

// Insert
export const insertUser = new ValidatedMethod({
  name: "Users.methods.insertUser",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: UserInsertSchema
  }).validator(),
  run({ user }) {
    if (Meteor.isServer) {
      // Check role
      // userIsInRole(["super", "admin"]);

      try {
        // Add new user
        const userId = Accounts.createUser({
          username: user.username,
          email: user.email,
          password: user.password,
          profile: {
            fullName: user.fullName,
            // branchPermissions: user.branchPermissions,
            status: user.status
          }
        });
        // Add roles
        // Roles.addUsersToRoles(userId, user.roles);

        return userId;
      } catch (e) {
        throwError(e);
      }
    }
  }
});

// Update
export const updateUser = new ValidatedMethod({
  name: "Users.methods.updateUser",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: UserUpdateSchema
  }).validator(),
  run({ user }) {
    if (Meteor.isServer) {
      // Check role
      // userIsInRole(["super", "admin"]);

      try {
        // Update user
        Meteor.users.update(
          { _id: user._id },
          {
            $set: {
              username: user.username,
              "emails.0.address": user.email,
              profile: {
                fullName: user.fullName,
                // branchPermissions: user.branchPermissions,
                type: user.type,
                status: user.status
              }
            }
          }
        );
        // Update roles
        // Roles.setUserRoles(user._id, user.roles);

        // Update password
        Accounts.setPassword(user._id, user.password, { logout: false });
        if (user._id === Meteor.userId()) {
          return "logout";
        }

        return "success";
      } catch (e) {
        throwError(e);
      }
    }
  }
});

export const removeUser = new ValidatedMethod({
  name: "Users.methods.removeUser",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      // Check role
      // userIsInRole(["super"]);

      try {
        return Meteor.users.remove({ _id });
      } catch (e) {
        throwError(e);
      }
    }
  }
});

// rateLimit({
//   methods: [
//     "Users.methods.find",
//     "Users.methods.findOneUser",
//     "Users.methods.insertUser",
//     "Users.methods.updateUser",
//     "Users.methods.removeUser"
//   ],
//   limit: 5,
//   timeRange: 1000
// });
