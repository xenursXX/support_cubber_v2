angular.module('starter.services', [])

    .factory('dropdown', ['$http','$q', function ($http,$q){
        var connectingdropdown = {};
        connectingdropdown.send = function(token){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "https://cubber.zendesk.com/api/v2/organizations.json",
                dataType: 'json',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token},

            })
                .success(function(data){
                    deferred.resolve(data);

                });
            return deferred.promise;
        };
        return connectingdropdown;

    }])




    .factory('userdisplay', ['$http','$q', function ($http,$q){
        var connectingdropdown = {};
        connectingdropdown.send = function(token,userid){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "https://cubber.zendesk.com/api/v2/organizations/"+userid+"/users.json",
                dataType: 'json',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token},

            })
                .success(function(data){
                    deferred.resolve(data);
                    console.log(data);

                });
            return deferred.promise;
        };
        return connectingdropdown;

    }])



    .factory('displayfilter', ['$http','$q', function ($http,$q){
        var connectingdropdown = {};
        connectingdropdown.user = function(token,idname){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "https://cubber.zendesk.com/api/v2/users/"+idname+"/tickets/requested.json",
                dataType: 'json',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token},

            })
                .success(function(data){
                    deferred.resolve(data);

                });
            return deferred.promise;
        };
        return connectingdropdown;

    }])

    .factory('userticket', ['$http','$q', function ($http,$q){
        var connectingdropdown = {};
        connectingdropdown.send = function(token,url){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
                dataType: 'json',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token},

            })
                .success(function(data){
                    deferred.resolve(data);


                });
            return deferred.promise;
        };
        return connectingdropdown;

    }])

    .factory('usernewticket', ['$http','$q', function ($http,$q){
        var connectingdropdown = {};
        connectingdropdown.send = function(token,authorid){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "https://cubber.zendesk.com/api/v2/users/"+authorid+"/tickets/requested.json",
                dataType: 'json',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token},

            })
                .success(function(data){
                    deferred.resolve(data);


                });
            return deferred.promise;
        };
        return connectingdropdown;

    }])

    .factory('username', ['$http','$q', function ($http,$q){
        var connectingdropdown = {};
        connectingdropdown.send = function(token,userid){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "https://cubber.zendesk.com/api/v2/users/"+userid+".json",
                dataType: 'json',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token},

            })
                .success(function(data){
                    deferred.resolve(data);


                });
            return deferred.promise;
        };
        return connectingdropdown;

    }])


    .factory('ticket', ['$http','$q', function ($http,$q){
        var connectingdropdown = {};
        connectingdropdown.send = function(token,ticketid){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "https://cubber.zendesk.com/api/v2/tickets/"+ticketid+"/comments.json",
                dataType: 'json',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token},

            })
                .success(function(data){
                    deferred.resolve(data);


                });
            return deferred.promise;
        };
        return connectingdropdown;

    }])

    .factory('infoticket', ['$http','$q', function ($http,$q){
        var connectingdropdown = {};
        connectingdropdown.send = function(token,ticketid){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: "https://cubber.zendesk.com/api/v2/tickets/"+ticketid+".json",
                dataType: 'json',
                headers: {'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+token},

            })
                .success(function(data){
                    deferred.resolve(data);


                });
            return deferred.promise;
        };
        return connectingdropdown;

    }])



//function displaycompany(token) {
//    $.ajax({
//        url: "https://cubber.zendesk.com/api/v2/organizations.json",
//        type: 'GET',
//        dataType: 'json',
//        contentType:'application/json',
//        cors: true,
//        beforeSend: function (xhr) {
//            xhr.setRequestHeader ("Authorization", "Bearer " + token);
//        },
//        success: function (data) {
//
//            for (i = 0; i < data.organizations.length; i++) {
//
//                var idorga = data.organizations[i].id;
//                var nameorga = data.organizations[i].name;
//                $("#dropdown").append('<li id="clickorga" onclick="displayname('+idorga+')">'+nameorga+'</li>');
//
//
//            }
//
//        }
//    })
//}
//
//
//function displayname(idorga) {
//    $.ajax({
//        url: "https://cubber.zendesk.com/api/v2/organizations/"+idorga+"/users.json",
//        type: 'GET',
//        dataType: 'json',
//        contentType:'application/json',
//        cors: true,
//        beforeSend: function (xhr) {
//            xhr.setRequestHeader ("Authorization", "Bearer " + token);
//        },
//        success: function (data){
//             data.users.sort(function(a,b){ return a.name.localeCompare(b.name); });
//
//            for (i = 0; i < data.users.length; i++) {
//
//                var user = data.users[i];
//
//                $("#displayname").append('<li>'+ user.name +'</li>')
//            }
//        },
//    });
//
//}



;























;