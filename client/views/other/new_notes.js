Template.newNotes.helpers({
  notes: function() {
    return Notes.find();
  },
  noteId: function() {
    return this._id;
  }
});

Template.newNotes.events({
  "focus #newNoteForm > textarea": function(e){
    Meteor.call("submitNote", {
      tagIds: ['Nhr25PCJDM7LtebPX']
    }, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        var goTo = '#'+result._id+ ' > textarea'
        $(goTo).focus();
      }
    });
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

Template.newNotes.onCreated(function() {
  var self = this;

  self.autorun(function() {
    // var id = FlowRouter.getParam('id');
    self.subscribe('singleCollection', 'Nhr25PCJDM7LtebPX');
  });
});
