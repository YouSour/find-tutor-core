import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import rateLimit from "/imports/utils/rate-limit";

import {
  TeacherAccountsInsertSchema,
  TeacherAccountsUpdateSchema
} from "./schema";

// Find
export const findTeacherAccount = new ValidatedMethod({
  name: "TeacherAccount.methods.findTeacherAccount",
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
export const findOneTeacherAccount = new ValidatedMethod({
  name: "TeacherAccount.methods.findOneTeacherAccount",
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
export const insertTeacherAccount = new ValidatedMethod({
  name: "TeacherAccount.methods.insertTeacherAccount",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: TeacherAccountsInsertSchema
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
            address: user.address,
            type: "teacher"
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
export const updateTeacherAccount = new ValidatedMethod({
  name: "TeacherAccount.methods.updateTeacherAccount",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    user: TeacherAccountsUpdateSchema
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
                address: user.address,
                type: "teacher"
              }
            }
          }
        );
        // Update roles
        // Roles.setUserRoles(user._id, ["Teacher"]);

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

export const removeTeacherAccount = new ValidatedMethod({
  name: "TeacherAccount.methods.removeTeacherAccount",
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
export class TEACHERACCOUNT {
  static findTeacherAccount(selector, options) {
    return Meteor.users.find(selector, options).fetch();
  }

  static findOneTeacherAccount(selector, options) {
    return Meteor.users.findOne(selector, options);
  }

  static insertTeacherAccount(user) {
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
          address: user.address,
          type: "teacher"
        }
      });

      return userId;
    } catch (e) {
      throwError(e);
    }
  }

  static updateTeacherAccount(user) {
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
              address: user.address,
              type: "teacher"
            }
          }
        }
      );
      // Update roles
      // Roles.setUserRoles(user._id, ["Teacher"]);

      // Update password
      Accounts.setPassword(user._id, user.password);
    } catch (e) {
      throwError(e);
    }
  }

  static removeTeacherAccount(_id) {
    try {
      return Meteor.users.remove({ _id });
    } catch (e) {
      throwError(e);
    }
  }
}

rateLimit({
  methods: [
    findTeacherAccount,
    findOneTeacherAccount,
    insertTeacherAccount,
    updateTeacherAccount,
    removeTeacherAccount
  ]
});
