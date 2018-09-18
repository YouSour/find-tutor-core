import { TEACHERACCOUNT } from "./methods";

/*
403: forbidden
404: not found
200: ok
201: created
304: not modified
*/

JsonRoutes.add("get", "/find_teacherAccount/:selector/:options", function(
  req,
  res,
  next
) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};
  const options = req.params.options ? JSON.parse(req.params.options) : {};
  let data = {};
  data.result = TEACHERACCOUNT.findTeacherAccount(selector, options);
  data.code = "200";
  JsonRoutes.sendResult(res, {
    data: data
  });
});

JsonRoutes.add("get", "/findOne_teacherAccount/:selector/:options", function(
  req,
  res,
  next
) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};
  const options = req.params.options ? JSON.parse(req.params.options) : {};
  let data = {};
  data.result = TEACHERACCOUNT.findOneTeacherAccount(selector, options);
  data.code = "200";
  JsonRoutes.sendResult(res, {
    data: data
  });
});

JsonRoutes.add("get", "/insert_teacherAccount/:user", function(req, res, next) {
  res.charset = "utf-8";
  const user = req.params.user ? JSON.parse(req.params.user) : {};

  TEACHERACCOUNT.insertTeacherAccount(user, (error, result) => {
    let data = {};
    if (error) {
      data.code = "403";
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

JsonRoutes.add("get", "/update_teacherAccount/:user", function(req, res, next) {
  res.charset = "utf-8";
  const user = req.params.user ? JSON.parse(req.params.user) : {};

  TEACHERACCOUNT.updateTeacherAccount(user, (error, result) => {
    let data = {};
    if (error) {
      data.code = "403";
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

JsonRoutes.add("get", "/remove_teacherAccount/:_id", function(req, res, next) {
  res.charset = "utf-8";
  const _id = req.params._id ? JSON.parse(req.params._id) : {};

  TEACHERACCOUNT.removeTeacherAccount(_id, (error, result) => {
    let data = {};
    if (error) {
      data.code = "403";
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
