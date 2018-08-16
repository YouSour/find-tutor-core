import { findUserRestApi } from "../../rest-api/users/methods";
// Enable cross origin requests for all endpoints
JsonRoutes.setResponseHeaders({
  "Cache-Control": "no-store",
  Pragma: "no-cache",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With"
});
let users = [];
findUserRestApi
  .callPromise({
    selector: {},
    options: {}
  })
  .then(result => {
    users = result;
  })
  .catch(error => {
    console.log(error);
  });

JsonRoutes.add("get", "/users-rest-api", function(req, res, next) {
  res.charset = "utf-8";
  JsonRoutes.sendResult(res, {
    data: users
  });
});
