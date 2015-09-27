Template.tags.helpers({
  tags: function () {
    return Collections.find();
  }
});

Template.tags.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('topTags');
  });
});
