import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Like = new Mongo.Collection("ft_likes");
Like.attachSchema(Schema);

export default Like;
