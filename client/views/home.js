Template.home.helpers({
  notes: function () {
    var notes = Notes.find({}, {sort: {score: -1}});

    return notes;
  }
});