import {Meteor} from 'meteor/meteor';
import Student from './collections';
/*
403: forbidden
404: not found
200: ok
201: created
304: not modified
*/
//meteor
Meteor.methods({
  find_student(selector, options) {
    STUDENT.findStudent(selector, options);
  },
  findOne_student(selector, options) {
    STUDENT.findOneStudent(selector, options);
  },
  insert_student(doc, callback) {
    STUDENT.insertStudent(doc, callback);
  },
  update_student(selector, modifier, options, callback) {
    STUDENT.updateStudent(selector, modifier, options, callback);
  },
  remove_student(selector, callback) {
    STUDENT.removeStudent(selector, callback);
  },
});

//rest
JsonRoutes.add("get", "/find_student/:selector/:options", function (req, res, next) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};
  const options = req.params.options ? JSON.parse(req.params.options) : {};
  let data = {};
  data.result = STUDENT.findStudent(selector, options);
  data.code = '200';
  JsonRoutes.sendResult(res, {
    data: data
  });
});
JsonRoutes.add("get", "/findOne_student/:selector/:options", function (req, res, next) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};
  const options = req.params.options ? JSON.parse(req.params.options) : {};
  let data = {};
  data.result = STUDENT.findOneStudent(selector, options);
  data.code = '200';
  JsonRoutes.sendResult(res, {
    data: data
  });
});
JsonRoutes.add("get", "/insert_student/:doc", function (req, res, next) {
  res.charset = "utf-8";
  const doc = req.params.doc ? JSON.parse(req.params.doc) : {};

  STUDENT.insertStudent(doc, (error, result) => {
    let data = {};
    if (error) {
      data.code = '403';
      data.msg = error.message;
      data.result = "";
    } else {
      data.code = "201";
      data.result = result;
    }
    JsonRoutes.sendResult(res, {
      data: data
    });
  });
});
JsonRoutes.add("get", "/update_student/:selector/:modifier/:options", function (req, res, next) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};
  const modifier = req.params.modifier ? JSON.parse(req.params.modifier) : {};
  const options = req.params.options ? JSON.parse(req.params.options) : {};
  STUDENT.updateStudent(selector, modifier, options, (error, result) => {
    let data = {};
    if (error) {
      data.code = '403';
      data.msg = error.message;
      data.result = "";
    } else {
      data.code = result ? "201" : "304";
      data.result = result;
    }
    JsonRoutes.sendResult(res, {
      data: data
    });
  });
});
JsonRoutes.add("get", "/remove_student/:selector", function (req, res, next) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};

  STUDENT.removeStudent(selector, (error, result) => {
    let data = {};
    if (error) {
      data.code = '403';
      data.msg = error.message;
      data.result = "";
    } else {
      data.code = result ? "201" : "304";
      data.result = result;
    }
    JsonRoutes.sendResult(res, {
      data: data
    });
  });
});

//model
class STUDENT {
  static findStudent(selector, options) {
    return Student.find(selector, options).fetch();
  }

  static findOneStudent(selector, options) {
    return Student.findOne(selector, options);
  }

  static insertStudent(doc, callback) {
    return Student.insert(doc, callback);
  }

  static updateStudent(selector, modifier, options, callback) {
    return Student.update(selector, {$set: modifier}, options, callback);
  }

  static removeStudent(selector, callback) {
    return Student.remove(selector, callback);
  }
}