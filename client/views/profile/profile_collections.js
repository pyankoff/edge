Template.profileCollections.helpers({
  collections: function(){
    return Collections.find();
  }
});

Template.profileCollections.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var username = FlowRouter.getParam('username');

    self.subscribe('singleUserCollections', username);
  });
});
