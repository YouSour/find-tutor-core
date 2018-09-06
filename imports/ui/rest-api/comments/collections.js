import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Comment = new Mongo.Collection("ft_comments");
Comment.attachSchema(Schema);

export default Comment;
