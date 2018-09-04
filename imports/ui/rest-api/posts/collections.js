import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Post = new Mongo.Collection("ft_posts");
Post.attachSchema(Schema);

export default Post;
