import {Accounts} from 'meteor/accounts-base';

Accounts.config({
    loginExpirationInDays: 1
});
Accounts.onCreateUser((options, user) => {
    user.profile = !!options.profile ? options.profile : {};
    user.services = !user.services && !!options.services ? options.services : user.services;
    if (user.username === 'super') {
        user.profile.approved = true;
        user.roles = ['super'];
        user.profile.visitor = true;
        user.profile.owner = true;
        user.profile.memberLevel = 3;
        Roles.addUsersToRoles(user._id, ['super']);
    } else {
        user.profile.provider = !!user.services && Object.keys(user.services)[0];
        user.profile.approved = true;
        user.profile.visitor = true;
        user.profile.owner = false;
        user.profile.memberLevel = 1;
        user.roles = ['visitor'];
        Roles.addUsersToRoles(user._id, ['visitor']); // add roles
    }
    return user;
});