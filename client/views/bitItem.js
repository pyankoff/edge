Template.bitItem.events({
  'click .glyphicon-remove': function (e) {
    e.preventDefault();
    Meteor.call('deleteBit', this._id);
  }
});