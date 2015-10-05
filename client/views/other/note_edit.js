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
         analytics.track("note deleted", {'_id': noteId});
         FlowRouter.go('/');
       }
     });
  }
});

AutoForm.addHooks('noteEditForm', {
  before: {
    update: function (doc) {
      var ids = doc.$set.tagIds;
      if (ids != undefined) {
        var tags = []
        for (var i = 0; i < ids.length; i++) {
          var tag = Collections.findOne(ids[i], {fields:
            {
              _id: true,
              type: true,
              name: true
            }
          });
          tags.push(tag);
        }
      };
      doc.$set.tags = tags;
      return doc;
    }
  },
  after: {
    update: function (error, result) {
      var noteId = FlowRouter.getParam("id");
      analytics.track("note edited", {'_id': noteId});
      FlowRouter.go('/note/:id', {id:noteId})
    }
  }
});

Template.noteEdit.onCreated(function() {
  var self = this;

  self.autorun(function() {
    self.subscribe('topTags');

    var id = FlowRouter.getParam('id');
    self.subscribe('singleNote', id);
  });
});
