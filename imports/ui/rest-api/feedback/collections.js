import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Feedback = new Mongo.Collection("ft_feedback");
Feedback.attachSchema(Schema);

export default Feedback;
