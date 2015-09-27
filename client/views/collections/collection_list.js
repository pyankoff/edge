Template.collectionList.helpers({
  collections: function () {
    return Collections.find();
  }
});

Template.collectionList.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('topCollections');
  });
});
