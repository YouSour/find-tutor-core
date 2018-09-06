import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import CommentSchema from "./schema";
import Comment from "./collections";

// Find
export const findComment = new ValidatedMethod({
  name: "Comment.methods.findComment",
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
      return COMMENT.findComment(selector, options);
    }
  }
});

// Find One
export const findOneComment = new ValidatedMethod({
  name: "Comment.methods.findOneComment",
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

      return COMMENT.findOne(selector, options);
    }
  }
});

// Insert
export const insertComment = new ValidatedMethod({
  name: "Comment.methods.insertComment",
  mixins: [CallPromiseMixin],
  validate: CommentSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertComment -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_comments"
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
        return COMMENT.insertComment(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_comments" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateComment = new ValidatedMethod({
  name: "Comment.methods.updateComment",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(CommentSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return COMMENT.updateComment({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeComment = new ValidatedMethod({
  name: "Comment.methods.removeComment",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return COMMENT.removeComment(_id);
    }
  }
});

//model
export class COMMENT {
  static findComment(selector, options) {
    return Comment.find(selector, options).fetch();
  }

  static findOneComment(selector, options) {
    return Comment.findOne(selector, options);
  }

  static insertComment(doc, callback) {
    return Comment.insert(doc, callback);
  }

  static updateComment(selector, modifier, options, callback) {
    return Comment.update(selector, { $set: modifier }, options, callback);
  }

  static removeComment(selector, callback) {
    return Comment.remove(selector, callback);
  }
}

rateLimit({
  methods: [
    findComment,
    findOneComment,
    insertComment,
    updateComment,
    removeComment
  ]
});
