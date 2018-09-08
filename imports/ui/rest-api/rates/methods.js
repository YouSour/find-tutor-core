import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import RateSchema from "./schema";
import Rate from "./collections";

// Find
export const findRate = new ValidatedMethod({
  name: "Rate.methods.findRate",
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
      return RATE.findRate(selector, options);
    }
  }
});

// Find One
export const findOneRate = new ValidatedMethod({
  name: "Rate.methods.findOneRate",
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

      return RATE.findOne(selector, options);
    }
  }
});

// Insert
export const insertRate = new ValidatedMethod({
  name: "Rate.methods.insertRate",
  mixins: [CallPromiseMixin],
  validate: RateSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertRate -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_Rate"
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
        return RATE.insertRate(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_Rate" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateRate = new ValidatedMethod({
  name: "Rate.methods.updateRate",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(RateSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return RATE.updateRate({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeRate = new ValidatedMethod({
  name: "Rate.methods.removeRate",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return RATE.removeRate(_id);
    }
  }
});

//model
export class RATE {
  static findRate(selector, options) {
    return Rate.find(selector, options).fetch();
  }

  static findOneRate(selector, options) {
    return Rate.findOne(selector, options);
  }

  static insertRate(doc, callback) {
    return Rate.insert(doc, callback);
  }

  static updateRate(selector, modifier, options, callback) {
    return Rate.update(selector, { $set: modifier }, options, callback);
  }

  static removeRate(selector, callback) {
    return Rate.remove(selector, callback);
  }
}

rateLimit({
  methods: [findRate, findOneRate, insertRate, updateRate, removeRate]
});
