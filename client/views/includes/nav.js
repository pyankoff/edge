Template.nav.helpers({
  username: function () {
    FlowRouter.watchPathChange();

    var instance = EasySearch.getComponentInstance(
      { index: 'notes', id: 'search'}
    );
    instance.clear();
    $('#search')[0].value = '';

    return Meteor.user().username;
  }
});

Template.nav.events({
  "click a": function(e){
    var instance = EasySearch.getComponentInstance(
      { index: 'notes', id: 'search'}
    );
    instance.clear();
    $('#search')[0].value = '';
  }
});

Template.nav.onCreated(function() {
    var self = this;

    self.autorun(function() {
      if (Meteor.user() != null) {
        self.subscribe('singleUser', Meteor.user().username);
      }
    });

    var instance = EasySearch.getComponentInstance(
      { index: 'notes', id: 'search'}
    );

    instance.on('searchingDone', function (searchingIsDone) {
      searchingIsDone && analytics.track("search", {'text': $('#search')[0].value});;
    });
});
