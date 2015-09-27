Template.comment.helpers({
  profilePath: function(){
    var username = this.author;

    return FlowRouter.path("profile", {username: username});
  },
  replyToThis: function() {
    var replyId = Session.get('replyTo');
    return replyId && replyId == this._id;
  }
});

Template.comment.events({
  "click .btn-reply": function(event, template){
    Session.set("replyTo", this._id);
  }
});
