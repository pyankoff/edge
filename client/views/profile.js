Template.profile.helpers({
  username: function () {
    var currentPath = FlowRouter.current();
    var username = currentPath.params.username;

    return username;
  }
});