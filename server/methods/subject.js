import {Meteor} from 'meteor/meteor';
import Subject from '../../imports/ui/rest-api/subjects/collection';

Meteor.methods({
  find_subjects() {
    SUBJECT.find();
  },
  find_subject(id) {
    return SUBJECT.findOne({id});
  }
});


export class SUBJECT {
  static find() {
    return Subject.find().fetch();
  }

  static findOne(params) {
    return Subject.find({_id: params.id}).fetch();
  }
}
