Template.profileHeader.helpers({
  username: function () {
    var currentPath = FlowRouter.current();
    var username = currentPath.params.username;

    return username;
  },
  userId: function () {
    var currentPath = FlowRouter.current();
    var user = Meteor.users.findOne({username: currentPath.params.username});

    return user._id;
  },
  linkForTab: function (tab) {
    FlowRouter.watchPathChange()
    var currentPath = FlowRouter.current();
    var params = _.extend(currentPath.params, {tab: tab});

    return FlowRouter.path('/@:username/:tab', params);
  },
  activeTab: function (tab) {
    var currentTab = FlowRouter.getParam('tab');

    return tab === currentTab ? 'active' : '';
    }
});

Template.profileHeader.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var username = FlowRouter.getParam('username');

    self.subscribe('singleUser', username);
  });
});
