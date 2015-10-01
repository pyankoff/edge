Template.profileUpvoted.helpers({
  notes: function () {
    var notes = Notes.find();

    return notes;
  }
});

Template.profileUpvoted.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var username = FlowRouter.getParam('username');

    self.subscribe('singleUser', username);
    self.subscribe('singleUserUpvoted', username);
  });
});
