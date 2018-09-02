import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Following = new Mongo.Collection("ft_following");
Following.attachSchema(Schema);

export default Following;
