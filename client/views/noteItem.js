Template.noteItem.helpers({
  noteLink: function() {
    return FlowRouter.path("/note/:id", {id: this._id});
  }
});