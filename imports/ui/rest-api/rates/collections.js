import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Rate = new Mongo.Collection("ft_rates");
Rate.attachSchema(Schema);

export default Rate;
