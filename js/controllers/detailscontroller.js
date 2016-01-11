angular.module('Routing')

.controller('DetailsCtrl', function($scope, $stateParams, Items){
    $scope.itemId = $stateParams.itemId;
    
});