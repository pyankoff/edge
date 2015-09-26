Meteor.publish('singleUser', function(id) {
  var options = {
    app: 1
  }

  return Meteor.users.find(id, options);
});

Meteor.publish("notes", function(){
  return Notes.find();
});

Meteor.publish("collections", function(){
  return Collections.find();
});

Meteor.publish("tags", function(){
  return Tags.find();
});
