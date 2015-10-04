Template.home.helpers({
  notes: function () {
    FlowRouter.watchPathChange();
    var context = FlowRouter.current()
    console.log();

    switch(context.path) {
    case '/top':
        return notes = Notes.find({}, {sort: {upvotes: -1}});
    case '/new':
        return notes = Notes.find({}, {sort: {createdAt: -1}});
    default:
        return notes = Notes.find({}, {sort: {score: -1}});
    }
  },
  moreResults: function() {
    return !(Notes.find().count() < Session.get("itemsLimit"));
  }
});

Template.home.onCreated(function() {
  var self = this;

  var ITEMS_INCREMENT = 20;
  Session.set('itemsLimit', ITEMS_INCREMENT);

  // whenever #showMoreResults becomes visible, retrieve more results
  function showMoreVisible() {
    console.log('scroll');
    var threshold, target = $(".showMoreResults");
    if (!target.length) return;

    threshold = $(window).scrollTop() + $(window).height() - target.height();

    if (target.offset().top < threshold) {
        if (!target.data("visible")) {
            // console.log("target became visible (inside viewable area)");
            target.data("visible", true);
            Session.set("itemsLimit",
                Session.get("itemsLimit") + ITEMS_INCREMENT);
        }
    } else {
        if (target.data("visible")) {
            // console.log("target became invisible (below viewable arae)");
            target.data("visible", false);
        }
    }
  }

  // run the above func every time the user scrolls
  $(window).scroll(showMoreVisible);

  self.autorun(function() {
    self.subscribe('topNotes', Session.get('itemsLimit'));
  });
});
