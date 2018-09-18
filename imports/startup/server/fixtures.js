import { Meteor } from "meteor/meteor";
import { EJSON } from "meteor/ejson";
import { Roles } from "meteor/alanning:roles";
import { Accounts } from "meteor/accounts-base";

Meteor.startup(function() {
  if (Meteor.isDevelopment) {
  }

  // User
  if (Meteor.users.find().count() === 0) {
    const data = EJSON.parse(Assets.getText("user-account.json"));
    data.forEach(({ username, email, password, profile, roles }) => {
      const userExists = Accounts.findUserByUsername(username);
      if (!userExists) {
        const userId = Accounts.createUser({
          username,
          email,
          password,
          profile
        });
        Roles.addUsersToRoles(userId, roles);
      }
    });
  }
});
