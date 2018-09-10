import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const UserFeedback = new Mongo.Collection("ft_userFeedback");
UserFeedback.attachSchema(Schema);

export default UserFeedback;
