'use strict';

angular.module('adUrCupApp',['ui.router'])
.config(function( $stateProvider, $urlRouterProvider, $locationProvider ,  $httpProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('home' , {
			url:'/'
		})
		.state('login', {
      url: '/login',
      controller: 'LoginCtlr',
      templateUrl: 'views/login.html'
    })
    .state('search', {
      url: '/search',
      controller: 'SearchCtlr',
      templateUrl: 'views/search.html'
    })
})
.controller("MainCtlr",function ($scope){
	$scope.test="kuch kuch hota hai";
})
.controller("LoginCtlr",function ($scope , $http , $location, $window){
	$scope.loginData={};
	$scope.submit=function(){
		console.log($scope.loginData);
		$http({
    method : "POST",
    headers:{
    	'Content-Type': 'application/json'
    },
    url : "http://api.adurcup.com/v2/login",
    data:$scope.loginData
	  })
	  .success(function mySucces(response) {
	  		console.log('response' , response);
	      $location.path('/search');
	   })
	  .error(function myError(response) {
	  		console.log('response' , response);
	      $location.path('/search');
	  		// alert('res nhi aaya');
	  });
	}
})
.controller("SearchCtlr",function ($scope , $http , $location, $window){
	$scope.query='';
	$scope.submitSearch=function(){
		$http({
			url:'http://api.adurcup.com/v2/products?query='+$scope.query,
    	method : "GET",
	  })
	  .success(function mySucces(response) {
	  		console.log('response' , response);
	  		if(!response.error){
	  			$scope.searchedData = response.products;
	  		}
	  		else{
	  			alert('error');
	  		}
	   })
	  .error(function myError(response) {
	  		console.log('response' , response);
	  		// alert('res nhi aaya');
	  });
	}
});