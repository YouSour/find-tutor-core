import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import FollowerSchema from "./schema";
import Follower from "./collections";

// Find
export const findFollower = new ValidatedMethod({
  name: "Follower.methods.findFollower",
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
      return FOLLOWER.findFollower(selector, options);
    }
  }
});

// Find One
export const findOneFollower = new ValidatedMethod({
  name: "Follower.methods.findOneFollower",
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

      return FOLLOWER.findOne(selector, options);
    }
  }
});

// Insert
export const insertFollower = new ValidatedMethod({
  name: "Follower.methods.insertFollower",
  mixins: [CallPromiseMixin],
  validate: FollowerSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertFollower -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_followers"
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
        return FOLLOWER.insertFollower(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_followers" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateFollower = new ValidatedMethod({
  name: "Follower.methods.updateFollower",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(FollowerSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return FOLLOWER.updateFollower({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeFollower = new ValidatedMethod({
  name: "Follower.methods.removeFollower",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return FOLLOWER.removeFollower(_id);
    }
  }
});

//model
export class FOLLOWER {
  static findFollower(selector, options) {
    return Follower.find(selector, options).fetch();
  }

  static findOneFollower(selector, options) {
    return Follower.findOne(selector, options);
  }

  static insertFollower(doc, callback) {
    return Follower.insert(doc, callback);
  }

  static updateFollower(selector, modifier, options, callback) {
    return Follower.update(selector, { $set: modifier }, options, callback);
  }

  static removeFollower(selector, callback) {
    return Follower.remove(selector, callback);
  }
}

rateLimit({
  methods: [
    findFollower,
    findOneFollower,
    insertFollower,
    updateFollower,
    removeFollower
  ]
});
