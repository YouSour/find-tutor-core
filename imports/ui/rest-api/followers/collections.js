import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Follower = new Mongo.Collection("ft_followers");
Follower.attachSchema(Schema);

export default Follower;
