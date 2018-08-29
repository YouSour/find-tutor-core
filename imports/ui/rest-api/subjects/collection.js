import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Subject = new Mongo.Collection("ft_subjects");
Subject.attachSchema(Schema);

export default Subject;
