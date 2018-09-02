import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import FollowingSchema from "./schema";
import Following from "./collections";

// Find
export const findFollowing = new ValidatedMethod({
  name: "Following.methods.findFollowing",
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
      return FOLLOWING.findFollowing(selector, options);
    }
  }
});

// Find One
export const findOneFollowing = new ValidatedMethod({
  name: "Following.methods.findOneFollowing",
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

      return FOLLOWING.findOne(selector, options);
    }
  }
});

// Insert
export const insertFollowing = new ValidatedMethod({
  name: "Following.methods.insertFollowing",
  mixins: [CallPromiseMixin],
  validate: FollowingSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertFollowing -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_Followings"
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
        return FOLLOWING.insertFollowing(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_Followings" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateFollowing = new ValidatedMethod({
  name: "Following.methods.updateFollowing",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(FollowingSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return FOLLOWING.updateFollowing({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeFollowing = new ValidatedMethod({
  name: "Following.methods.removeFollowing",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return FOLLOWING.removeFollowing(_id);
    }
  }
});

//model
export class FOLLOWING {
  static findFollowing(selector, options) {
    return Following.find(selector, options).fetch();
  }

  static findOneFollowing(selector, options) {
    return Following.findOne(selector, options);
  }

  static insertFollowing(doc, callback) {
    return Following.insert(doc, callback);
  }

  static updateFollowing(selector, modifier, options, callback) {
    return Following.update(selector, { $set: modifier }, options, callback);
  }

  static removeFollowing(selector, callback) {
    return Following.remove(selector, callback);
  }
}

rateLimit({
  methods: [
    findFollowing,
    findOneFollowing,
    insertFollowing,
    updateFollowing,
    removeFollowing
  ]
});
