Template.collectionItem.helpers({
  collectionLink: function() {
    return FlowRouter.path("/collection/:id", {id: this._id});
  }
});
