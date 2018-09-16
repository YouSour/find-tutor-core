import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import LikeSchema from "./schema";
import Like from "./collections";

// Find
export const findLike = new ValidatedMethod({
  name: "Like.methods.findLike",
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
      return LIKE.findLike(selector, options);
    }
  }
});

// Find One
export const findOneLike = new ValidatedMethod({
  name: "Like.methods.findOneLike",
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

      return LIKE.findOne(selector, options);
    }
  }
});

// Insert
export const insertLike = new ValidatedMethod({
  name: "Like.methods.insertLike",
  mixins: [CallPromiseMixin],
  validate: LikeSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertLike -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_likes"
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
        return Like.insertLike(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_likes" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateLike = new ValidatedMethod({
  name: "Like.methods.updateLike",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(LikeSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return LIKE.updateLike({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeLike = new ValidatedMethod({
  name: "Like.methods.removeLike",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return LIKE.removeLike(_id);
    }
  }
});

//model
export class LIKE {
  static findLike(selector, options) {
    return Like.find(selector, options).fetch();
  }

  static findOneLike(selector, options) {
    return Like.findOne(selector, options);
  }

  static insertLike(doc, callback) {
    return Like.insert(doc, callback);
  }

  static updateLike(selector, modifier, options, callback) {
    return Like.update(selector, { $set: modifier }, options, callback);
  }

  static removeLike(selector, callback) {
    return Like.remove(selector, callback);
  }
}

rateLimit({
  methods: [findLike, findOneLike, insertLike, updateLike, removeLike]
});
