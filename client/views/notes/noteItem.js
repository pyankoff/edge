Template.noteItem.helpers({
  pathForNote: function() {
    var params = {
        noteId: this._id
    };

    var path = FlowRouter.path("note/:noteId", params);

    return path;
  }
});