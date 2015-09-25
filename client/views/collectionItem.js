Template.collectionItem.helpers({
  noteLink: function() {
    return FlowRouter.path("/collection/:id", {id: this._id});
  }
});