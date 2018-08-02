import {Accounts} from 'meteor/accounts-base';

Accounts.config({
  loginExpirationInDays: 1
});
Accounts.onCreateUser((options, user) => {
  user.profile = !!options.profile ? options.profile : {};
  // user.services = !user.services && !!options.services ? options.services : user.services; //social sign in
  if (user.username === 'super') {
    user.profile.approved = true;
    user.profile.owner = true;
    user.roles = ['super', 'admin'];
    Roles.addUsersToRoles(user._id, ['super', 'admin']);
  }
  else if (user.username === 'admin') {
    user.profile.approved = true;
    user.profile.owner = false;
    user.roles = ['admin'];
    Roles.addUsersToRoles(user._id, ['admin']);
  }
  else {
    // user.profile.provider = !!user.services && Object.keys(user.services)[0];
    user.profile.approved = false;
    user.profile.owner = false;
    user.roles = ['guest'];
    Roles.addUsersToRoles(user._id, ['guest']); // add roles
  }
  return user;
});