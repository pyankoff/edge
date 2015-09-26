Template.tagPage.helpers({
  notes: function () {
    FlowRouter.watchPathChange()
    var currentPath = FlowRouter.current();
    var tag = Tags.findOne(currentPath.params.id);

    var notes = Notes.find({
      tags: tag._id
    });

    return notes;
  }
});
