import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import './config/account';
// import './publication';
import "../imports/startup/server";


Meteor.startup(() => {
// Enable cross origin requests for all endpoints
//   JsonRoutes.setResponseHeaders({
//     "Cache-Control": "no-store",
//     "Pragma": "no-cache",
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
//   });


  // if (Meteor.users.find({}).count() === 0) {
    // Accounts.createUser({
    //   username: "super",
    //   email: "email@gmail.com",
    //   password: "123456"
    // })
  // }
});
