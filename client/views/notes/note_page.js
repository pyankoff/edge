Template.notePage.helpers({
  note: function () {
    var currentPath = FlowRouter.current();
    var note = Notes.findOne(currentPath.params.id);
    return note;
  },
  comments: function() {
    return Comments.find({noteId: this._id});
  }
});

Template.notePage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleNote', id);
  });
});
