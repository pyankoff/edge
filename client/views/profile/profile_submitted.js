Template.profileSubmitted.helpers({
  notes: function () {
    return Notes.find();
  }
});

Template.profileSubmitted.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var username = FlowRouter.getParam('username');

    self.subscribe('singleUserSubmitted', username);
  });
});
