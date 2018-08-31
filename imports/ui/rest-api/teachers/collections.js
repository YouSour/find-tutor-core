import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Teacher = new Mongo.Collection("ft_teachers");
Teacher.attachSchema(Schema);

export default Teacher;
