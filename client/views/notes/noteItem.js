Template.noteItem.helpers({
  noteLink: function() {
    return FlowRouter.path("/note/:id", {id: this._id});
  },
  actionClass: function () {
    var user = Meteor.user();
    var actionClass = "";

    if(!user) return false;

    if (user.hasUpvoted(this)) {
      actionClass += " upvoted";
    }

    return actionClass;
  },
  tags: function () {
    var tags = Collections.find({
      "_id": {$in: this.tags},
      "isTag": true
    });
    return tags;
  },
  linkForTag: function () {
    return FlowRouter.path("/tag/:id", {id: this._id});
  }
});

Template.noteItem.events({
  'click .btn-upvote': function(e){
    e.preventDefault();
    var note = this;
    var user = Meteor.user();

    if(!user){
      FlowRouter.go('atSignIn');
      // Messages.flash(i18n.t("please_log_in_first"), "info");
    }
    if (user.hasUpvoted(note)) {
      Meteor.call('cancelUpvoteNote', note._id, function(){
        // Events.track("note upvote cancelled", {'_id': note._id});
      });
    } else {
      Meteor.call('upvoteNote', note._id, function(){
        // Events.track("note upvoted", {'_id': note._id});
      });
    }
  }
});
