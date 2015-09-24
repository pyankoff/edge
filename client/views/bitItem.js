Template.noteItem.events({
  'click .glyphicon-remove': function(e) {
    if (confirm("Are you sure you want to delete item?")){
      Meteor.call('deleteBit', this._id);
    };
  },
  'click .glyphicon-plus': function(e) {
    Session.set("selected", this._id);
  },
  'submit .collect': function(e) {
    e.preventDefault();

    var collectionName = e.target.collection.value;

    Meteor.call('collect', this._id, collectionName, function (error, result) {
      Session.set("currentCollection", result);
    });

    e.target.reset();
    Session.set('selected', null);
  }
});

Template.noteItem.helpers({
  selected: function () {
    return this._id == Session.get("selected");
  },
  noteLink: function() {
    return FlowRouter.path("/note/:id", {id:this._id});
  }
});