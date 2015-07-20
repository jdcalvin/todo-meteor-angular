(function(){
Meteor.startup(function() { $('body').attr({"ng-app":"simple-todos","ng-include":"'todos-list.ng.html'","ng-controller":"TodosListCtrl"}); });

Template.body.addContent((function() {
  var view = this;
  return "";
}));
Meteor.startup(Template.body.renderToDocument);

})();
