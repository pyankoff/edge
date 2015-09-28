Template.peopleList.helpers({
  people: function () {
    return Collections.find({type: 'person'}, {sort: {noteCount: -1}});
  }
});

Template.peopleList.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('topPeople');
  });
});
