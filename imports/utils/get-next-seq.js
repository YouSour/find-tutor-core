import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import _ from "lodash";
import Counters from "../ui/api/counters/counters";

const doNextSeq = function({ _id, opts }, callback) {
  new SimpleSchema({
    _id: {
      type: String
    },
    opts: {
      type: Object,
      optional: true
    },
    "opts.seq": {
      type: SimpleSchema.Integer,
      optional: true
    },
    "opts.paddingType": {
      type: String, // start, end
      optional: true
    },
    "opts.paddingLength": {
      type: SimpleSchema.Integer,
      optional: true
    },
    "opts.paddingChar": {
      type: String,
      optional: true
    },
    "opts.prefix": {
      type: String,
      optional: true
    }
  }).validator({ _id, opts });
  opts = opts || {};

  // Default Opts
  _.defaults(opts, {
    seq: 1,
    paddingType: null,
    paddingLength: 0,
    paddingChar: "0",
    prefix: "",
    toString: true
  });

  Counters.rawCollection().findOneAndUpdate(
    { _id },
    { $inc: { seq: opts.seq } },
    { upsert: true, returnOriginal: false },
    (error, result) => {
      let seq;
      if (!error) {
        // Check padding
        seq = result.value.seq;
        switch (opts.paddingType) {
          case "start":
            seq = _.padStart(seq, opts.paddingLength, opts.paddingChar);
            break;
          case "end":
            seq = _.padEnd(seq, opts.paddingLength, opts.paddingChar);
            break;
        }
        seq = opts.prefix ? `${opts.prefix}${seq}` : seq;

        // To string
        if (opts.toString) {
          seq = seq.toString();
        }
      }

      callback(error, seq);
    }
  );
};

const getNextSeq = Meteor.wrapAsync(doNextSeq);
export default getNextSeq;
