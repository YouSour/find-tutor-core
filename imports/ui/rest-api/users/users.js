import { findUserRestApi } from "../../rest-api/users/methods";

JsonRoutes.add("get", "/users-rest-api/:prams", function(req, res, next) {
  res.charset = "utf-8";
  const params = req.params.params;

  JsonRoutes.sendResult(res, {
    data: USER.findOne(params)
  });
});


class USER {
  static findOne(selector, options){
    return Meteor.users.find(selector, options).fetch();
  }
}