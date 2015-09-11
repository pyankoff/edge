Notes = new Mongo.Collection('notes');

Meteor.methods({
  newNote: function(name) {
    check(this.userId, String);
    check(name, String);
    
    var noteId = Notes.insert({
      name: name,
      points: [],
      userId: this.userId,
      username: Meteor.user().emails[0].address
    });

    return noteId;
  },
  fork: function(note) {
    var oldUserId = note.userId;

    delete note._id;
    note.userId = this.userId;
    note.username = Meteor.user().emails[0].address;

    var noteId = Notes.insert(note);

    createNotification(oldUserId, noteId, note.username);

    return noteId;
  }
});