import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import SubjectSchema from "./schema";
import Subject from "./collection";

// Find
export const findSubject = new ValidatedMethod({
  name: "Subject.methods.findSubject",
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
      return SUBJECT.findSubject(selector, options);
    }
  }
});

// Find One
export const findOneSubject = new ValidatedMethod({
  name: "Subject.methods.findOneSubject",
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

      return SUBJECT.findOne(selector, options);
    }
  }
});

// Insert
export const insertSubject = new ValidatedMethod({
  name: "Subject.methods.insertSubject",
  mixins: [CallPromiseMixin],
  validate: SubjectSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertSubject -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_subjects"
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
        return SUBJECT.insertSubject(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_subjects" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateSubject = new ValidatedMethod({
  name: "Subject.methods.updateSubject",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(SubjectSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return SUBJECT.updateSubject({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeSubject = new ValidatedMethod({
  name: "Subject.methods.removeSubject",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return SUBJECT.removeSubject(_id);
    }
  }
});

export class SUBJECT {
  static findSubject(selector, options) {
    return Subject.find(selector, options).fetch();
  }

  static findOneSubject(selector, options) {
    return Subject.findOne(selector, options);
  }

  static insertSubject(doc, callback) {
    return Subject.insert(doc, callback);
  }
  static updateSubject(selector, modifier, options, callback) {
    return Subject.update(selector, { $set: modifier }, options, callback);
  }

  static removeSubject(selector, callback) {
    return Subject.remove(selector, callback);
  }
}

rateLimit({
  methods: [
    findSubject,
    findOneSubject,
    insertSubject,
    updateSubject,
    removeSubject
  ]
});
