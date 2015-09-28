Template.nav.helpers({
  username: function () {
    return Meteor.user().username;
  },
  imageLink: function() {
    return Meteor.user().imgUrl ? Meteor.user().imgUrl : "http://placehold.it/30x30";
  }
});

Template.nav.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('singleUser', Meteor.user().username);
  });
});
