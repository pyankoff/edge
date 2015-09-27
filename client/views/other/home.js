Template.home.helpers({
  notes: function () {
    var notes = Notes.find({}, {sort: {score: -1}});

    return notes;
  }
});

Template.home.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('topNotes');
  });
});
