angular.module('Routing')

    .config(function($stateProvider, $urlRouterProvider){
        //this runs automatically when the main module is created
            $urlRouterProvider.otherwise("/main.html");

            $stateProvider
            .state('/main', {
                url: "/main.html",
                templateUrl: 'templates/main.html',
                controller: 'MainCtrl'
            })
            .state('/main.details', {
                
                url:'/details/:itemId',
                templateUrl: 'templates/details.html',
                controller: 'DetailsCtrl',
                resolve:{
                detailList: function($http){
                    //alert("calling series.json");
                    return $http.get("data/celebs.json").then(
                        function(response){
                            return response;
                        }
                    );
                }
            }

            })

        
    });