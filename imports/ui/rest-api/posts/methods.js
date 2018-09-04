import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";
import _ from "lodash";

import rateLimit from "/imports/utils/rate-limit";
import getNextSeq from "/imports/utils/get-next-seq";

import PostSchema from "./schema";
import Post from "./collections";

// Find
export const findPost = new ValidatedMethod({
  name: "Post.methods.findPost",
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
      return Post.findPost(selector, options);
    }
  }
});

// Find One
export const findOnePost = new ValidatedMethod({
  name: "Post.methods.findOnePost",
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

      return Post.findOne(selector, options);
    }
  }
});

// Insert
export const insertPost = new ValidatedMethod({
  name: "Post.methods.insertPost",
  mixins: [CallPromiseMixin],
  validate: PostSchema.validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      // console.log("insertPost -> doc", doc);
      const _id = getNextSeq({
        // Mandatory
        filter: {
          _id: "ft_posts"
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
        return Post.insertPost(doc);
      } catch (error) {
        // Decrement seq
        getNextSeq({
          filter: { _id: "ft_posts" },
          opts: { seq: -1 }
        });
      }
    }
  }
});

// Update
export const updatePost = new ValidatedMethod({
  name: "Post.methods.updatePost",
  mixins: [CallPromiseMixin],
  // validate: null,
  validate: _.clone(PostSchema)
    .extend({
      _id: String
    })
    .validator(),
  run(doc) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(100);
      return Post.updatePost({ _id: doc._id }, doc);
    }
  }
});

// Remove
export const removePost = new ValidatedMethod({
  name: "Post.methods.removePost",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: String
  }).validator(),
  run({ _id }) {
    if (Meteor.isServer) {
      return Post.removePost(_id);
    }
  }
});

//model
export class POST {
  static findPost(selector, options) {
    return Post.find(selector, options).fetch();
  }

  static findOnePost(selector, options) {
    return Post.findOne(selector, options);
  }

  static insertPost(doc, callback) {
    return Post.insert(doc, callback);
  }

  static updatePost(selector, modifier, options, callback) {
    return Post.update(selector, { $set: modifier }, options, callback);
  }

  static removePost(selector, callback) {
    return Post.remove(selector, callback);
  }
}

rateLimit({
  methods: [findPost, findOnePost, insertPost, updatePost, removePost]
});
