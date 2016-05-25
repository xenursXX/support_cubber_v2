/**
 * Created by guillaumenouhaud on 03/05/2016.
 */

var route = angular.module('route', ["ui.router","starter"])
route.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/app/index")

    $stateProvider


        .state('app',{
            abstract:false,
            url:"/app",
            templateUrl: "views/header.html",
            controller:"homeCtrl",
            reloadOnSearch:true

        })
        .state('app.organization', {
            url: "/organization/:id",
            templateUrl: "views/organization.html",
            controller:"homeCtrl",
            reloadOnSearch:true
        })
        .state('app.usersingle',{
            url:"/user:id?page:iterate",
            templateUrl: "views/single_user.html",
            controller:"userCtrl",
            reloadOnSearch:true
        })
        .state('app.ticket',{
            url:"/ticket:id/author:myid",
            templateUrl: "views/ticket.html",
            controller:"ticketCtrl",
            reloadOnSearch:true
        })
        .state('index',{
            url:"/index",
            templateUrl: "views/index.html",
            controller:"homeCtrl",
            reloadOnSearch:true

        })
    });
