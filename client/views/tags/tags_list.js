Template.tags.helpers({
  tags: function () {
    return Tags.find();
  },
  tagLink: function() {
    return FlowRouter.path("/tag/:id", {id: this._id});
  }
});

Template.tags.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('tags');
  });
});
