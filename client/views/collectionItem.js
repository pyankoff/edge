Template.collectionItem.events({
  'click .note': function(e) {
    FlowRouter.go("/collection/:id", {id: this._id});
  }
});

Template.collectionItem.helpers({
  noteLink: function() {
    return FlowRouter.path("/collection/:id", {id: this._id});
  }
});