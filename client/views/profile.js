Template.profile.helpers({
  username: function () {
    var currentPath = FlowRouter.current();
    var username = currentPath.params.username;

    return username;
  },
  linkForUpvoted: function () {
    var currentPath = FlowRouter.current();
    var params = _.omit(currentPath.params, 'tab');

    return FlowRouter.path('profileRoute', params);
  },
  linkForSubmitted: function () {
    var currentPath = FlowRouter.current();
    var params = _.extend(currentPath.params, {tab: 'submitted'});

    return FlowRouter.path('profileTabRoute', params);
  },
  linkForCollections: function () {
    var currentPath = FlowRouter.current();
    var params = _.extend(currentPath.params, {tab: 'collections'});

    return FlowRouter.path('profileTabRoute', params);
  },
  notes: function () {
    var username = FlowRouter.getParam('username');
    var user = Meteor.users.findOne({username:username});

    var notes = Notes.find({"_id": {$in: user.app.upvotedNotes}});

    return notes;
  }
});

Template.profile.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var username = FlowRouter.getParam('username');

    var user = Meteor.users.findOne({username:username});

    self.subscribe('singleUser', user._id);
  });
});
