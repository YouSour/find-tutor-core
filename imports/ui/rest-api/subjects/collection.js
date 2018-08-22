import { Mongo } from "meteor/mongo";
import Schema from "./schema";

const Subject = new Mongo.Collection("subject_restApi");
Subject.attachSchema(Schema);

export default Subject;
