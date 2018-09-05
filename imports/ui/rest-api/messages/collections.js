import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Message = new Mongo.Collection("ft_messages");
Message.attachSchema(Schema);

export default Message;
