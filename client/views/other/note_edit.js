Template.noteEdit.helpers({
  note: function () {
    var noteId = FlowRouter.getParam("id");
    if (noteId != undefined) {
      return Notes.findOne({_id:noteId});
    }
    var tag = FlowRouter.getQueryParam("tag");
    return {tagIds: [tag]};
  }
});

Template.noteEdit.events({
  "click .delete": function(e){
     e.preventDefault();

     var noteId = FlowRouter.getParam("id");
     Meteor.call("deleteNote", noteId, function(error, result){
       if(error){
         console.log("error", error);
       } else {
         FlowRouter.go('/');
       }
     });
  }
});

Template.noteEdit.onCreated(function() {
  var self = this;

  AutoForm.addHooks('noteEditForm', {
    after: {
      update: function (error, result) {
        var noteId = FlowRouter.getParam("id");
        FlowRouter.go('/note/:id', {id:noteId})
      }
    }
  })

  self.autorun(function() {
    self.subscribe('topTags');

    var id = FlowRouter.getParam('id');
    self.subscribe('singleNote', id);
  });
});
