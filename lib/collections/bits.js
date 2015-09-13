Bits = new Mongo.Collection('bits');

Meteor.methods({
  newBit: function(bit) {
    var bitId = Bits.insert(bit);

    return bitId;
  },
  deleteBit: function(bitId) {
    Bits.remove(bitId);
  }
});





