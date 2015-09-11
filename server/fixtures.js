// Fixture data 
if (Points.find().count() === 0) {
  var now = new Date().getTime();

  var sachaId = Meteor.users.insert({
    profile: { name: 'Sacha Greif' }
  });
  var sacha = Meteor.users.findOne(sachaId);
  
  for (var i = 0; i < 10; i++) {
    Points.insert({
      text: 'Test point #' + i,
      userId: sacha._id,
      url: 'http://google.com/?q=test-' + i,
      submitted: new Date(now - i * 3600 * 1000 + 1),
      lighters: [], lights: 0
    });
  }
}