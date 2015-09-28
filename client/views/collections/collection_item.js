Template.collectionItem.helpers({
  collectionLink: function() {
    return FlowRouter.path("/"+this.type+"/:id", {id: this._id});
  },
  imageLink: function() {
    return this.imgUrl ? this.imgUrl : "http://placehold.it/300x300";
  }
});
