import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Counters = new Mongo.Collection("counters");

Counters.schema = new SimpleSchema({
  seq: {
    type: SimpleSchema.Integer
  }
});

Counters.attachSchema(Counters.schema);

export default Counters;
