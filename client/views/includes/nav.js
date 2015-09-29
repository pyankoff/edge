Template.nav.helpers({
  username: function () {
    return Meteor.user().username;
  }
});

Template.nav.onCreated(function() {
    var self = this;
    self.autorun(function() {
      if (Meteor.user() != null) {
        self.subscribe('singleUser', Meteor.user().username);
      }
    });
});
