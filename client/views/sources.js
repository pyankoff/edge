Template.sources.helpers({
  sources: function () {
    return Sources.find();
  },
  sourceLink: function() {
    return FlowRouter.path("/source/:id", {id: this._id});
  }
});