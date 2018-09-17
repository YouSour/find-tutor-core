import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import rateLimit from "/imports/utils/rate-limit";

import {
  StudentAccountsInsertSchema,
  StudentAccountsUpdateSchema
} from "./schema";

// Find
export const findStudentAccount = new ValidatedMethod({
  name: "StudentAccount.methods.findStudentAccount",
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
      selector = selector || {};
      options = options || {};
      return Meteor.users.find(selector, options).fetch();
    }
  }
});

// Find One
export const findOneStudentAccount = new ValidatedMethod({
  name: "StudentAccount.methods.findOneStudentAccount",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ selector, options }) {
    if (Meteor.isServer) {
      selector = selector || {};
      options = options || {};
      return Meteor.users.findOne(selector, options);
    }
  }
});

// Insert
export const insertStudentAccount = new ValidatedMethod({
  name: "StudentAccount.methods.insertStudentAccount",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: StudentAccountsInsertSchema
  }).validator(),
  run({ user }) {
    if (Meteor.isServer) {
      // Check role
      // userIsInRole(["super", "admin"]);

      try {
        // Add new user
        const userId = Accounts.createUser({
          username: user.enName,
          email: user.email,
          password: user.password,
          profile: {
            fullName: user.enName,
            dob: user.dob,
            gender: user.gender,
            phoneNumber: user.phoneNumber,
            address: user.address
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
export const updateStudentAccount = new ValidatedMethod({
  name: "StudentAccount.methods.updateStudentAccount",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: StudentAccountsUpdateSchema
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
              username: user.enName,
              "emails.0.address": user.email,
              profile: {
                fullName: user.enName,
                dob: user.dob,
                gender: user.gender,
                phoneNumber: user.phoneNumber,
                address: user.address
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

export const removeStudentAccount = new ValidatedMethod({
  name: "StudentAccount.methods.removeStudentAccount",
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

//model
export class STUDENTACCOUNT {
  static findStudentAccount(selector, options) {
    return Meteor.users.find(selector, options).fetch();
  }

  static findOneStudentAccount(selector, options) {
    return Meteor.users.findOne(selector, options);
  }

  static insertStudentAccount(user) {
    try {
      // Add new user
      const userId = Accounts.createUser({
        username: user.enName,
        email: user.email,
        password: user.password,
        profile: {
          fullName: user.enName,
          dob: user.dob,
          gender: user.gender,
          phoneNumber: user.phoneNumber,
          address: user.address
        }
      });
      // Add roles
      // Roles.addUsersToRoles(userId, user.roles);

      return userId;
    } catch (e) {
      throwError(e);
    }
  }

  static updateStudentAccount(user) {
    try {
      // Update user
      Meteor.users.update(
        { _id: user._id },
        {
          $set: {
            username: user.enName,
            "emails.0.address": user.email,
            profile: {
              fullName: user.enName,
              dob: user.dob,
              gender: user.gender,
              phoneNumber: user.phoneNumber,
              address: user.address
            }
          }
        }
      );
      // Update roles
      // Roles.setUserRoles(user._id, user.roles);

      // Update password
      Accounts.setPassword(user._id, user.password);
    } catch (e) {
      throwError(e);
    }
  }

  static removeStudentAccount(_id) {
    try {
      return Meteor.users.remove({ _id });
    } catch (e) {
      throwError(e);
    }
  }
}

rateLimit({
  methods: [
    findStudentAccount,
    findOneStudentAccount,
    insertStudentAccount,
    updateStudentAccount,
    removeStudentAccount
  ]
});
