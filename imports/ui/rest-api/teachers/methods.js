import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import TeacherSchema from "./schema";
import Teacher from "./collections";

// Find
export const findTeacher = new ValidatedMethod({
  name: "Teacher.methods.findTeacher",
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
      return TEACHER.findTeacher(selector, options);
    }
  }
});

// Find One
export const findOneTeacher = new ValidatedMethod({
  name: "Teacher.methods.findOneTeacher",
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

      return TEACHER.findOne(selector, options);
    }
  }
});

// Insert
export const insertTeacher = new ValidatedMethod({
  name: "Teacher.methods.insertTeacher",
  mixins: [CallPromiseMixin],
  validate: TeacherSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertTeacher -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_teachers"
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
        return TEACHER.insertTeacher(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_teachers" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateTeacher = new ValidatedMethod({
  name: "Teacher.methods.updateTeacher",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(TeacherSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return TEACHER.updateTeacher({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeTeacher = new ValidatedMethod({
  name: "Teacher.methods.removeTeacher",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return TEACHER.removeTeacher(_id);
    }
  }
});

//model
export class TEACHER {
  static findTeacher(selector, options) {
    return Teacher.find(selector, options).fetch();
  }

  static findOneTeacher(selector, options) {
    return Teacher.findOne(selector, options);
  }

  static insertTeacher(doc, callback) {
    return Teacher.insert(doc, callback);
  }

  static updateTeacher(selector, modifier, options, callback) {
    return Teacher.update(selector, { $set: modifier }, options, callback);
  }

  static removeTeacher(selector, callback) {
    return Teacher.remove(selector, callback);
  }
}

rateLimit({
  methods: [
    findTeacher,
    findOneTeacher,
    insertTeacher,
    updateTeacher,
    removeTeacher
  ]
});
