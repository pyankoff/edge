Template.tags.helpers({
  tags: function () {
    return Tags.find();
  },
  tagLink: function() {
    return FlowRouter.path("/tag/:id", {id: this._id});
  }
});