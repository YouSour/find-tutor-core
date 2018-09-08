import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import FeedbackSchema from "./schema";
import Feedback from "./collections";

// Find
export const findFeedback = new ValidatedMethod({
  name: "Feedback.methods.findFeedback",
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
      return FEEDBACK.findFeedback(selector, options);
    }
  }
});

// Find One
export const findOneFeedback = new ValidatedMethod({
  name: "Feedback.methods.findOneFeedback",
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

      return FEEDBACK.findOne(selector, options);
    }
  }
});

// Insert
export const insertFeedback = new ValidatedMethod({
  name: "Feedback.methods.insertFeedback",
  mixins: [CallPromiseMixin],
  validate: FeedbackSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertFeedback -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_feedback"
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
        return FEEDBACK.insertFeedback(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_feedback" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateFeedback = new ValidatedMethod({
  name: "Feedback.methods.updateFeedback",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(FeedbackSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return FEEDBACK.updateFeedback({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeFeedback = new ValidatedMethod({
  name: "Feedback.methods.removeFeedback",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return FEEDBACK.removeFeedback(_id);
    }
  }
});

//model
export class FEEDBACK {
  static findFeedback(selector, options) {
    return Feedback.find(selector, options).fetch();
  }

  static findOneFeedback(selector, options) {
    return Feedback.findOne(selector, options);
  }

  static insertFeedback(doc, callback) {
    return Feedback.insert(doc, callback);
  }

  static updateFeedback(selector, modifier, options, callback) {
    return Feedback.update(selector, { $set: modifier }, options, callback);
  }

  static removeFeedback(selector, callback) {
    return Feedback.remove(selector, callback);
  }
}

rateLimit({
  methods: [
    findFeedback,
    findOneFeedback,
    insertFeedback,
    updateFeedback,
    removeFeedback
  ]
});
