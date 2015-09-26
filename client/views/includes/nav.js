Template.nav.helpers({
  username: function () {
    return Meteor.user().username;
  }
});