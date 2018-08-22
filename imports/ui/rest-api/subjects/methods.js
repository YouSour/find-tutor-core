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

      return Subject.find(selector, options).fetch();
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

      return Subject.findOne(selector, options);
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
          _id: "subject_restApi"
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
        return Subject.insert(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "subject_restApi" },
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

      return Subject.update({ _id: doc._id }, { $set: doc });
    }
  }
});

// Upsert Category
export const upsertSubject = new ValidatedMethod({
  name: "Subject.methods.upsertSubject",
  mixins: [CallPromiseMixin],
  validate: _.clone(SubjectSchema)
    .extend({
      _id: {
        type: String,
        optional: true
      }
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      let _id;
      if (!doc._id) {
        _id = getNextSeq({
          filter: {
            _id: "subject_restApi"
          },
          opts: { seq: 1 }
        });
        doc._id = _id.toString();
      }
      try {
        return Subject.upsert({ _id: doc._id }, { $set: doc });
      } catch (error) {
        if (_id) {
          _id = getNextSeq({
            filter: { _id: "subject_restApi" },
            seq: { seq: -1 }
          });
        }
      }
    }
  }
});

// Soft remove
export const softRemoveSubject = new ValidatedMethod({
  name: "Subject.methods.softRemoveSubject",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return Subject.softRemove(_id);
    }
  }
});

// Restore
export const restoreSubject = new ValidatedMethod({
  name: "Subject.methods.restoreSubject",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return Subject.restore(_id);
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
      return Subject.remove(_id);
    }
  }
});

rateLimit({
  methods: [
    findSubject,
    findOneSubject,
    insertSubject,
    updateSubject,
    softRemoveSubject,
    restoreSubject,
    removeSubject
  ]
});
