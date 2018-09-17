import { STUDENTACCOUNT } from "./methods";

/*
403: forbidden
404: not found
200: ok
201: created
304: not modified
*/

JsonRoutes.add("get", "/find_studentAccount/:selector/:options", function(
  req,
  res,
  next
) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};
  const options = req.params.options ? JSON.parse(req.params.options) : {};
  let data = {};
  data.result = STUDENTACCOUNT.findStudentAccount(selector, options);
  data.code = "200";
  JsonRoutes.sendResult(res, {
    data: data
  });
});

JsonRoutes.add("get", "/findOne_studentAccount/:selector/:options", function(
  req,
  res,
  next
) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};
  const options = req.params.options ? JSON.parse(req.params.options) : {};
  let data = {};
  data.result = STUDENTACCOUNT.findOneStudentAccount(selector, options);
  data.code = "200";
  JsonRoutes.sendResult(res, {
    data: data
  });
});

JsonRoutes.add("get", "/insert_studentAccount/:user", function(req, res, next) {
  res.charset = "utf-8";
  const user = req.params.user ? JSON.parse(req.params.user) : {};

  STUDENTACCOUNT.insertStudentAccount(user, (error, result) => {
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

JsonRoutes.add("get", "/update_studentAccount/:user", function(req, res, next) {
  res.charset = "utf-8";
  const user = req.params.user ? JSON.parse(req.params.user) : {};

  STUDENTACCOUNT.updateStudentAccount(user, (error, result) => {
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

JsonRoutes.add("get", "/remove_studentAccount/:_id", function(req, res, next) {
  res.charset = "utf-8";
  const _id = req.params._id ? JSON.parse(req.params._id) : {};

  STUDENTACCOUNT.removeStudentAccount(_id, (error, result) => {
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
