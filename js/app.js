/**
 * Created by guillaumenouhaud on 03/05/2016.
 */

var route = angular.module('route', ["ui.router","starter"])
route.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/app")

    $stateProvider


        .state('app',{
            abstract:false,
            url:"/app",
            templateUrl: "views/header.html",
            controller:"homeCtrl"

        })
        .state('app.organization', {
            url: "/organization/:id",
            templateUrl: "views/organization.html",
            controller:"homeCtrl"
        })
        .state('app.usersingle',{
        url:"/user:id?page:iterate",
        templateUrl: "views/single_user.html",
        controller:"userCtrl"
        })
        .state('app.ticket',{
            url:"/ticket:id/author:myid",
            templateUrl: "views/ticket.html",
            controller:"ticketCtrl"
        })
    });
