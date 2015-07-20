(function(){Tasks = new Mongo.Collection("tasks");


if (Meteor.isClient) {
  
  var app = angular.module("simple-todos", ['angular-meteor']);

  app.controller("TodosListCtrl", ['$scope','$meteor', function($scope, $meteor) {
    var m = $scope.m = {};
    var db = $scope.db = {};

    db.tasks = $meteor.collection(function() {
      return Tasks.find({}, { sort: {createdAt: -1}});
    });

    m.newTaskText = '';


    $scope.addTask = function() {
      task = {text: m.newTaskText, createdAt: new Date()};
      db.tasks.push(task);
      m.newTaskText = '';

    }

    $scope.deleteTask = function(task) {
      // var editingTask = db.tasks.find({id: task._id});
      // editingTask.delete
      db.tasks.remove(task);
    }

    $scope.onEditTask = function(task) {
      if (task.checked) return;
      task.editing = true;
    }

    $scope.checkTask = function(task) {
      // task.checked = !task.checked;
    }

    $scope.totalCompleted = function() {
      return db.tasks.filter(function(t) { return t.checked; }).length
    }

  }]);

    app.directive('ngFocus', function( $timeout ) {
      return function( scope, elem, attrs ) {
        scope.$watch(attrs.ngFocus, function( newval ) {
          if ( newval ) {
            $timeout(function() {
              elem[0].focus();
            }, 0, false);
          }
        });
      };
  });

  app.directive('ngBlur', function() {
    return function( scope, elem, attrs ) {
      elem.bind('blur', function() {
        scope.$apply(attrs.ngBlur);
      });
    };
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

})();
