Template.layout.onRendered(function() {
    var instance =  Template.instance();
    instance.autorun(function() {
        var action = FlowRouter.getQueryParam("action");
        if (action == "newNote" || action == "addToNote") {
            var alertsModal = $('#'+ action);
            alertsModal.modal("show");
            alertsModal.one("hidden.bs.modal", function() {
                 // to remove the action query param
                 FlowRouter.setQueryParams({action: null});
            });
        }
    });
});