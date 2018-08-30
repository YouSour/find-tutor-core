import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Student = new Mongo.Collection("ft_students");
Student.attachSchema(Schema);

export default Student;
