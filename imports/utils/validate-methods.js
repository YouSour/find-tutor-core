import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { check } from "meteor/check";
// import { Roles } from "meteor/alanning:roles";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";

import rateLimit from "./rate-limit";
// import { userIsInRole, throwError } from "./security";

//Collection

import Subject from "../ui/rest-api/subjects/collection";

// Use exist
export const validateUserExist = new ValidatedMethod({
  name: "app.validateUserExist",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    selector: {
      type: Object,
      blackbox: true
    }
  }).validator(),
  run({ selector }) {
    if (Meteor.isServer) {
      return Meteor.users.findOne(selector);
    }
  }
});

// User password
export const validateUserPassword = new ValidatedMethod({
  name: "app.validateUserPassword",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    password: String
  }).validator(),
  run({ password }) {
    if (Meteor.isServer) {
      let digest = Package.sha.SHA256(password);
      let user = Meteor.user();
      let passwordOpts = { digest: digest, algorithm: "sha-256" };
      let result = Accounts._checkPassword(user, passwordOpts);

      return result;
    }
  }
});

export const validateKhNameExist = new ValidatedMethod({
  name: "app.validateKhNameExist",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    selector: {
      type: Object,
      blackbox: true,
      optional: true
    }
  }).validator(),
  run({ selector }) {
    if (Meteor.isServer) {
      return Subject.findOne(selector);
    }
  }
});
