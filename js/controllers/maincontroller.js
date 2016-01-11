angular.module('Routing')

.controller('MainCtrl', function($scope, $http, Items){

        //$http({method: 'GET', url:'data/celebs.json'})
        $scope.allData;

        Items.getAll()
            .then(function(response){
                //sucess
                $scope.allData = response.data;
            }, function(response) {

            });

});