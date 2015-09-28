Template.collectionList.helpers({
  collections: function () {
    return Collections.find({type: 'collection'});
  }
});

Template.collectionList.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('topCollections');
  });
});
