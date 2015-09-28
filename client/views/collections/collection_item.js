Template.collectionItem.helpers({
  collectionLink: function() {
    return FlowRouter.path("/"+this.type+"/:id", {id: this._id});
  }
});
