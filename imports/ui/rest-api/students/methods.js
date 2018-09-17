import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import StudentSchema from "./schema";
import Student from "./collections";

// Find
export const findStudent = new ValidatedMethod({
  name: "Student.methods.findStudent",
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
      return STUDENT.findStudent(selector, options);
    }
  }
});

// Find One
export const findOneStudent = new ValidatedMethod({
  name: "Student.methods.findOneStudent",
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
      Meteor._sleepForMs(100);
      selector = selector || {};
      options = options || {};

      return STUDENT.findOne(selector, options);
    }
  }
});

// Insert
export const insertStudent = new ValidatedMethod({
  name: "Student.methods.insertStudent",
  mixins: [CallPromiseMixin],
  validate: StudentSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertStudent -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_Students"
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
        return STUDENT.insertStudent(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_Students" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateStudent = new ValidatedMethod({
  name: "Student.methods.updateStudent",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(StudentSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return STUDENT.updateStudent({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeStudent = new ValidatedMethod({
  name: "Student.methods.removeStudent",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return STUDENT.removeStudent(_id);
    }
  }
});

//model
export class STUDENT {
  static findStudent(selector, options) {
    return Student.find(selector, options).fetch();
  }

  static findOneStudent(selector, options) {
    return Student.findOne(selector, options);
  }

  static insertStudent(doc, callback) {
    return Student.insert(doc, callback);
  }

  static updateStudent(selector, modifier, options, callback) {
    return Student.update(selector, { $set: modifier }, options, callback);
  }

  static removeStudent(selector, callback) {
    return Student.remove(selector, callback);
  }
}

rateLimit({
  methods: [
    findStudent,
    findOneStudent,
    insertStudent,
    updateStudent,
    removeStudent
  ]
});
