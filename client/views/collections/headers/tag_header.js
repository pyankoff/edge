Template.tagHeader.helpers({
  collection: function () {
    var id = FlowRouter.getParam('id');

    return Collections.findOne(id);
  }
});

Template.tagHeader.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var id = FlowRouter.getParam('id');
    self.subscribe('singleCollection', id);
  });
});
