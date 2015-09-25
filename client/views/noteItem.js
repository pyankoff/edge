Template.noteItem.events({
  'click .glyphicon-remove': function(e) {
    if (confirm("Are you sure you want to delete item?")){
      Meteor.call('deleteBit', this._id);
    };
  },
  'click .glyphicon-plus': function(e) {
    Session.set("selected", this._id);
  },
  'click .note': function(e) {
    FlowRouter.go("/note/:id", {id: this._id});
  }
});

Template.noteItem.helpers({
  selected: function () {
    return this._id == Session.get("selected");
  },
  noteLink: function() {
    return FlowRouter.path("/note/:id", {id: this._id});
  }
});