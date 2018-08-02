import { Meteor } from "meteor/meteor";
import { EJSON } from "meteor/ejson";
import { Roles } from "meteor/alanning:roles";
import { Accounts } from "meteor/accounts-base";

Meteor.startup(function() {
  /**
   * Development
   */
  if (Meteor.isDevelopment) {
  }
  /**
   * Production
   */
  // Company
  // if (Company.find().count() === 0) {
  //   const data = EJSON.parse(Assets.getText('company.json'))
  //   Company.insert(data)
  // }

  // Branch
  // if (Branches.find().count() === 0) {
  //   const data = EJSON.parse(Assets.getText('branch.json'))
  //   data.forEach(doc => {
  //     Branches.insert(doc)
  //   })
  // }

  // Currency
  // if (Currency.find().count() === 0) {
  //   const data = EJSON.parse(Assets.getText('currency.json'))
  //   data.forEach(doc => {
  //     Currency.insert(doc)
  //   })
  // }

  // Roles
  // if (Roles.getAllRoles().count() === 0) {
  //   const data = EJSON.parse(Assets.getText('roles.json'))
  //   data.forEach(role => {
  //     Roles.createRole(role)
  //   })
  // }

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
        Roles.addUsersToRoles(userId, roles)
      }
    });
  }

});
