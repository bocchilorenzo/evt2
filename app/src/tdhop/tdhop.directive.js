angular.module('evtviewer.tdhop')
   .directive('evtTredhop', ['evtTredhop', "evtInterface", "$timeout", function(evtTredhop, evtInterface, $timeout) {
	return {
		restrict: 'AE',
		scope: {
         canvas: '@',
         measurebox:'@',
         options: "=",
         name: "=",
      },
      controllerAs: "vm",
      controller: "TreDHOPCtrl",
      templateUrl: 'src/tdhop/tdhop.directive.tmpl.html',

      transclude: true,
      //template: "<div id='tdhop' class='box-tdhop box-body Edition noBottomMenu'>",

		link: function(scope, element, attrs) {
         $timeout(function () {
         var currentTdhop = evtTredhop.build(scope);

         // Garbage collection
         scope.$on('$destroy', function() {
             if (currentTdhop){
               tdhop.destroy(currentTdhop.currentId);
             }
         });
      }, 10);
      }
   };
}]);