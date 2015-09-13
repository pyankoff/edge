Template.newBit.events({
  'submit .newBit': function (e) {
    e.preventDefault();

    var bit = {
      text: e.target.text.value,
      author: e.target.author.value,
      source: e.target.source.value
    }

    Meteor.call('newBit', bit, function (error, result) {

    });

    e.target.reset();
  }
});