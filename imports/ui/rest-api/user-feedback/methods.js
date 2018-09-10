import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import UserFeedbackSchema from "./schema";
import UserFeedback from "./collections";

// Find
export const findUserFeedback = new ValidatedMethod({
  name: "UserFeedback.methods.findUserFeedback",
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
      return USERFEEDBACK.findUserFeedback(selector, options);
    }
  }
});

// Find One
export const findOneUserFeedback = new ValidatedMethod({
  name: "UserFeedback.methods.findOneUserFeedback",
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
      console.log(selector);
      Meteor._sleepForMs(100);
      selector = selector || {};
      options = options || {};

      return USERFEEDBACK.findOne(selector, options);
    }
  }
});

// Insert
export const insertUserFeedback = new ValidatedMethod({
  name: "UserFeedback.methods.insertUserFeedback",
  mixins: [CallPromiseMixin],
  validate: UserFeedbackSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertUserFeedback -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_userFeedback"
          // type: '001' // BranchId
        },
        // Optional
        opts: {
          seq: 1
          // paddingType: 'start',
          // paddingLength: 6,
          // paddingChar: '0',
          // prefix: ''
        }
      });
      try {
        doc._id = _id.toString();
        return USERFEEDBACK.insertUserFeedback(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_userFeedback" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateUserFeedback = new ValidatedMethod({
  name: "UserFeedback.methods.updateUserFeedback",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(UserFeedbackSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return USERFEEDBACK.updateUserFeedback({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeUserFeedback = new ValidatedMethod({
  name: "UserFeedback.methods.removeUserFeedback",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return USERFEEDBACK.removeUserFeedback(_id);
    }
  }
});

//model
export class USERFEEDBACK {
  static findUserFeedback(selector, options) {
    return UserFeedback.find(selector, options).fetch();
  }

  static findOneUserFeedback(selector, options) {
    return UserFeedback.findOne(selector, options);
  }

  static insertUserFeedback(doc, callback) {
    return UserFeedback.insert(doc, callback);
  }

  static updateUserFeedback(selector, modifier, options, callback) {
    return UserFeedback.update(selector, { $set: modifier }, options, callback);
  }

  static removeUserFeedback(selector, callback) {
    return UserFeedback.remove(selector, callback);
  }
}

rateLimit({
  methods: [
    findUserFeedback,
    findOneUserFeedback,
    insertUserFeedback,
    updateUserFeedback,
    removeUserFeedback
  ]
});
