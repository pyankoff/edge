Template.sourcePage.helpers({
  notes: function () {
    var currentPath = FlowRouter.current();
    var source = Sources.findOne(currentPath.params.id);

    var notes = Bits.find({
      source: source._id
    });

    return notes;
  }
});