Meteor.startup(function () {
  var scoreInterval = 60;
  if (scoreInterval > 0) {

    // active items get updated every N seconds
    Meteor.setInterval(function () {
      var updatedNotes = 0;
      var updatedComments = 0;

      Notes.find({'inactive': {$ne : true}}).forEach(function (note) { 
        updatedNotes += App.updateScore({collection: Notes, item: note});
      });

      Comments.find({'inactive': {$ne : true}}).forEach(function (comment) {
        updatedComments += App.updateScore({collection: Comments, item: comment});
      });
      console.log("Updated "+updatedNotes+"/"+Notes.find().count()+" Notes")
      console.log("Updated "+updatedComments+"/"+Comments.find().count()+" Comments")
    }, scoreInterval * 1000);

    // inactive items get updated every hour
    Meteor.setInterval(function () {
      var updatedNotes = 0;
      var updatedComments = 0;
      Notes.find({'inactive': true}).forEach(function (note) {
        updatedNotes += App.updateScore({collection: Notes, item: note});
      });

      Comments.find({'inactive': true}).forEach(function (comment) {
        updatedComments += App.updateScore({collection: Comments, item: comment});
      });
    }, 3600 * 1000);

  }
});