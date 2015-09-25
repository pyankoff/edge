Template.note.helpers({
  note: function () {
    var currentPath = FlowRouter.current();
    var note = Bits.findOne(currentPath.params.id);
    return note;
  },
  comments: function() {
    return Comments.find({note: this._id});
  }
});