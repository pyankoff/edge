// Template.factPage.onCreated(function() {
//   var self = this;
//   self.autorun(function() {
//     var postId = FlowRouter.getParam('factId');
//     self.subscribe('singleFact', factId);  
//   });
// });

Template.pointPage.helpers({
  fact: function() {
    var pointId = FlowRouter.getParam('pointId');
    var point = Points.findOne({_id: pointId}) || {};
    return point;
  }
});