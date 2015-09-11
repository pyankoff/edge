Notes = new Mongo.Collection('notes');

Meteor.methods({
  newNote: function(name) {
    check(this.userId, String);
    check(name, String);
    
    var noteId = Notes.insert({
      name: name,
      author: this.userId
    });

    return noteId;
  }
});