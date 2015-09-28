Template.classesList.helpers({
  classes: function () {
    return Collections.find();
  }
});

Template.classesList.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('topClasses');
  });
});
