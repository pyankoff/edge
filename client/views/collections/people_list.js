Template.peopleList.helpers({
  people: function () {
    return Collections.find();
  }
});

Template.peopleList.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('topPeople');
  });
});
