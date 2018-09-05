import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import MessageSchema from "./schema";
import Message from "./collections";

// Find
export const findMessage = new ValidatedMethod({
  name: "Message.methods.findMessage",
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
      return MESSAGE.findMessage(selector, options);
    }
  }
});

// Find One
export const findOneMessage = new ValidatedMethod({
  name: "Message.methods.findOneMessage",
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

      return MESSAGE.findOne(selector, options);
    }
  }
});

// Insert
export const insertMessage = new ValidatedMethod({
  name: "Message.methods.insertMessage",
  mixins: [CallPromiseMixin],
  validate: MessageSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertMessage -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_Messages"
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
        return MESSAGE.insertMessage(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_Messages" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updateMessage = new ValidatedMethod({
  name: "Message.methods.updateMessage",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(MessageSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return MESSAGE.updateMessage({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removeMessage = new ValidatedMethod({
  name: "Message.methods.removeMessage",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return MESSAGE.removeMessage(_id);
    }
  }
});

//model
export class MESSAGE {
  static findMessage(selector, options) {
    return Message.find(selector, options).fetch();
  }

  static findOneMessage(selector, options) {
    return Message.findOne(selector, options);
  }

  static insertMessage(doc, callback) {
    return Message.insert(doc, callback);
  }

  static updateMessage(selector, modifier, options, callback) {
    return Message.update(selector, { $set: modifier }, options, callback);
  }

  static removeMessage(selector, callback) {
    return Message.remove(selector, callback);
  }
}

rateLimit({
  methods: [
    findMessage,
    findOneMessage,
    insertMessage,
    updateMessage,
    removeMessage
  ]
});
