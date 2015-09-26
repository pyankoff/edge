Template.home.helpers({
  notes: function () {
    var notes = Notes.find();

    return notes;
  }
});