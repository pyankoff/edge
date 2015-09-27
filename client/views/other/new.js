Template.newNote.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('topTags');
  });
});
