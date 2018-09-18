import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import rateLimit from "/imports/utils/rate-limit";

import { UserInsertSchema, UserUpdateSchema } from "./users";

// Find
export const findUser = new ValidatedMethod({
  name: "User.methods.find",
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
    }
  }
});

// Find One
export const findOneUser = new ValidatedMethod({
  name: "User.methods.findOneUser",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return Meteor.users.findOne(_id);
    }
  }
});

// Insert
export const insertUser = new ValidatedMethod({
  name: "User.methods.insertUser",
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
            type: user.type,
            status: user.status
          }
        });

        return userId;
      } catch (e) {
        throwError(e);
      }
    }
  }
});

// Update
export const updateUser = new ValidatedMethod({
  name: "User.methods.updateUser",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: UserUpdateSchema
  }).validator(),
  run({ user }) {
    if (Meteor.isServer) {
      // Check role
      // userIsInRole(["super", "admin"]);
      console.log(user);
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
                type: user.type,
                status: user.status
              }
            }
          }
        );
        // Update roles
        Roles.setUserRoles(user._id, user.type);

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
  name: "User.methods.removeUser",
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

rateLimit({
  methods: [findUser, findOneUser, insertUser, updateUser, removeUser]
});
