Template.editCollection.helpers({
  notes: function() {
    query = Notes.find()
    return query;
  },
  collection: function () {
    var id = Session.get('colId');
    return Collections.findOne(id);
  }
});

Template.editCollection.events({
  "click .new": function(e){
    Meteor.call("submitNote", {
      collectionIds: [Session.get('colId')]
    });
  },
  'click .save': function (e) {
    $('#newCollection').submit();
    FlowRouter.go('/collection/:id', {id: Session.get('colId')});
  },
  'keydown .noteForm > textarea': function(e) {
    var go = function(dir) {
      e.preventDefault();

      var currentNote = $(e.target).parent('.noteForm')[0];
      if (dir == 'prev') {
        var prevNoteArea = $(currentNote).prev().children()[0];
      } else if (dir == 'next') {
        var prevNoteArea = $(currentNote).next().children()[0];
      }
      var currentText = $(prevNoteArea).val();
      $(prevNoteArea).focus().val('').val(currentText);
    }

    var textLength = e.target.value.length

    if (textLength === 0 && e.which === 8) {
      go('prev')

      var currentNote = $(e.target).parent('.noteForm')[0];
      var id = currentNote.id;
      Notes.remove({_id:id});
    } else if ($(e.target).prop("selectionStart") == 0 && e.which === 38) {
      go('prev');
    } else if ($(e.target).prop("selectionStart") == textLength
          && (e.which === 40 || e.which === 13)) {
      go('next');
    };
  }
});

Template.editCollection.onCreated(function() {
  var self = this;

  var colId = FlowRouter.getQueryParam('id');

  if (colId != undefined) {
    Session.set('colId', colId);
    self.autorun(function() {
      self.subscribe('singleCollection', colId);
      self.subscribe('topTags');
    });
  } else {
    Meteor.call("collectionSubmit", {}, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        var colId = result._id;
        Session.set('colId', colId);
        Meteor.call("submitNote", {
          collectionIds: [colId]
        });
        self.autorun(function() {
          self.subscribe('singleCollection', colId);
          self.subscribe('topTags');
        });
      }
    });
  }
});
