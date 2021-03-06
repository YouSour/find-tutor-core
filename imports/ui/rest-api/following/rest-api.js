import { FOLLOWING } from "./methods";

/*
403: forbidden
404: not found
200: ok
201: created
304: not modified
*/

JsonRoutes.add("get", "/find_following/:selector/:options", function(
  req,
  res,
  next
) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};
  const options = req.params.options ? JSON.parse(req.params.options) : {};
  let data = {};
  data.result = FOLLOWING.findFollowing(selector, options);
  data.code = "200";
  JsonRoutes.sendResult(res, {
    data: data
  });
});

JsonRoutes.add("get", "/findOne_following/:selector/:options", function(
  req,
  res,
  next
) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};
  const options = req.params.options ? JSON.parse(req.params.options) : {};
  let data = {};
  data.result = FOLLOWING.findOneFollowing(selector, options);
  data.code = "200";
  JsonRoutes.sendResult(res, {
    data: data
  });
});

JsonRoutes.add("get", "/insert_following/:doc", function(req, res, next) {
  res.charset = "utf-8";
  const doc = req.params.doc ? JSON.parse(req.params.doc) : {};

  FOLLOWING.insertFollowing(doc, (error, result) => {
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

JsonRoutes.add(
  "get",
  "/update_following/:selector/:modifier/:options",
  function(req, res, next) {
    res.charset = "utf-8";
    const selector = req.params.selector ? JSON.parse(req.params.selector) : {};
    const modifier = req.params.modifier ? JSON.parse(req.params.modifier) : {};
    const options = req.params.options ? JSON.parse(req.params.options) : {};
    FOLLOWING.updateFollowing(selector, modifier, options, (error, result) => {
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
  }
);

JsonRoutes.add("get", "/remove_following/:selector", function(req, res, next) {
  res.charset = "utf-8";
  const selector = req.params.selector ? JSON.parse(req.params.selector) : {};

  FOLLOWING.removeFollowing(selector, (error, result) => {
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
