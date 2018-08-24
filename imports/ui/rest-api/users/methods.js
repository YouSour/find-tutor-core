import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import rateLimit from "/imports/utils/rate-limit";

// Find
export const findUserRestApi = new ValidatedMethod({
  name: "User.methods.findUserRestApi",
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
      // return Meteor.users.find(selector, options).fetch();
      return USER.findOne(selector, options);
    }
  }
});

rateLimit({
  methods: [findUserRestApi]
});
