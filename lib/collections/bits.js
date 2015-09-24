Bits = new Mongo.Collection('bits');

Meteor.methods({
  newBit: function(bit) {
    var bitId = Bits.insert(bit);

    return bitId;
  },
  deleteBit: function(bitId) {
    Bits.remove(bitId);
  },
  collect: function(bitId, colName) {
    Bits.upsert({
      text: colName
    }, {
      $addToSet: {bits: bitId},
      $set: {collection: true},
      $set: {author: 'Collection'}
    });
    var colId = Bits.findOne({text: colName})._id;

    return colId;
  },
  removeFromCollection: function(bitId, colId) {
    Bits.update({
      _id: colId
    }, {
      $pull: {bits: bitId}
    });
  }
});





