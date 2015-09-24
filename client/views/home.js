Template.home.helpers({
  bits: function () {
    var bits = Bits.find();
    FlowRouter.watchPathChange();

    var currentPath = FlowRouter.current();

    if (currentPath.path == '/collections') {
      bits = Bits.find({collection: true});
    } else if (currentPath.params.id != null) {
      var bit = Bits.findOne(currentPath.params.id);
      
      if (bit.collection) {
        bits = Bits.find({_id: {$in: bit.bits }});
      } else {
        bits = [bit];
      }

    }
    return bits;
  },
  currentCollection: function () {
    var colId = Session.get("currentCollection");
    var bits = null;

    if (colId) {
      var col = Bits.findOne(colId);
      var colBits = col.bits;

      bits = Bits.find({ _id: { $in: colBits } });
    }
    
    return bits;
  },
  collectionName: function() {
    var colId = Session.get("currentCollection");
    var colName = null;

    if (colId) {
      var col = Bits.findOne(colId);
      colName = col.text;
    }
    return colName;
  }
});