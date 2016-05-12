

angular.module('starter', ['starter.services','ui.bootstrap','angularMoment','highcharts-ng','ngSanitize'])

    .filter('datefilter',function(){


      var newdate =  moment(created_at).format("YYYY-MM-DD");
        return newdate;
    })

    .filter('recentTicket',function(){

    })


    .controller('ticketCtrl',['$scope','$stateParams', '$state','ticket','username','infoticket','usernewticket',

        function ($scope,$stateParams, $state,ticket,username,infoticket,usernewticket) {

                var ticketid = $stateParams.id;
                var authorid = $stateParams.myid;
                console.log($stateParams);

            var token = "fd959281c193b795cb10d75089c40891d55d7f7bd618d4ea837f171c0ae5fcb0";
            var ticketarrayid = [];
            ticket.send(token,ticketid).then(function (data) {
                console.log(data)
                $scope.ticketcontent = data.comments;
                console.log($scope.ticketcontent);

            }).then(username.send(token,authorid).then(function(data){
                console.log(data);
                var name = data.user.name;
                $scope.myname = name;

            })).then(infoticket.send(token,ticketid).then(function(data){
                console.log(data);
                $scope.infoticket = data.ticket;
            })).then(usernewticket.send(token,authorid).then(function(data){
console.log(data);
                for(p=0;p<data.tickets.length;p++){
                    var idtickets = data.tickets[p].id;
                    ticketarrayid.push(idtickets);

                }



                $scope.next = function(){

                    var positionnextticket = ticketarrayid.indexOf(parseInt(ticketid))+1;

                    if(positionnextticket == ticketarrayid.length){
                        positionnextticket = 0
                    }
                    console.log(ticketarrayid);
                    console.log(positionnextticket);
                    var nextticket = ticketarrayid[positionnextticket];

                    $state.go('app.ticket',{id:nextticket,myid:authorid});

                }

                $scope.previous = function(){

                    var previousticket = ticketarrayid.indexOf(parseInt(ticketid))-1;
                    if(previousticket == -1){
                        previousticket = 0;
                    }
                    previousticket = ticketarrayid[previousticket];
                    $state.go('app.ticket',{id:previousticket,myid:authorid});
                }

            }))




        }])

    .controller('userCtrl',['$scope','$stateParams', '$state','username','$window','$location','userticket',

        function ($scope,$stateParams, $state,username,$window,$location,userticket) {










            //-----------------------------liste des tickets----------------------------

            var iterate = $stateParams.iterate;
            var userid = $stateParams.id;
            var token = "fd959281c193b795cb10d75089c40891d55d7f7bd618d4ea837f171c0ae5fcb0";

            //Get Username
           var user = username.send(token,userid).then(function (data) {
                $scope.name = data.user.name;

                var name = data.user.name;
               return name;

            });
            var dynamicdate = [];


            if(iterate == "1"){
                var url ="https://cubber.zendesk.com/api/v2/users/"+userid+"/tickets/requested.json";
            }else{
                var url ="https://cubber.zendesk.com/api/v2/users/"+userid+"/tickets/requested.json?page="+iterate;
            }



                //Get tickets by user
            userticket.send(token,url).then(function (data) {


                //list of tickets
            $scope.userticket = data.tickets;

                var nbtickets = data.count;
                var nextpage = data.next_page;
                var previouspage = data.previous_page;
                console.log(previouspage);
                console.log(nextpage);

                console.log(nextpage);
                if(nextpage == null){
                    $scope.nextarrow = false;
                }else{
                     $scope.nextarrow=true;
                }
                if(previouspage == null){
                    $scope.prevarrow = false;
                }else{
                    $scope.prevarrow = true;
                }




                // ---------------------------------pagination----------------------------



                $scope.next = function(){
                    iterate++;
                   //$location.path($window.location.href+"?page="+iterate);
                    $state.go('app.usersingle',{id:userid,iterate:iterate});
                    //console.log($state.go('app.usersingle',{id:userid,page:iterate}));
                    console.log("coucou");


                }
                $scope.previous = function(){
                    iterate--;
                    $state.go('app.usersingle',{id:userid,iterate:iterate});
                }



                console.log(nbtickets);
                $scope.ticketnumber = nbtickets;




                //------------------ticket total par mois-------------------
                var currentmonth = 0;
                var month1 = 0;
                var month2 = 0;
                var month3 = 0;
                var month4 = 0;
                var month5 = 0;
                var month6 = 0;
                var month7 = 0;
                var month8 = 0;
                var month9 = 0;
                var month10 = 0;
                var month11 = 0;

                //------------ticket tag assistance par mois-------------------
                var currentmonthassist =0;
                var month1assist =0;
                var month2assist =0;
                var month3assist =0;
                var month4assist =0;
                var month5assist =0;
                var month6assist =0;
                var month7assist =0;
                var month8assist =0;
                var month9assist =0;
                var month10assist =0;
                var month11assist =0;
                //------------ticket tag maintenance par mois-------------------
                var currentmonthmaint =0;
                var month1maint =0;
                var month2maint =0;
                var month3maint =0;
                var month4maint =0;
                var month5maint =0;
                var month6maint =0;
                var month7maint =0;
                var month8maint =0;
                var month9maint =0;
                var month10maint =0;
                var month11maint =0;


                //------------ticket tag bug par mois-------------------
                var currentmonthbug =0;
                var month1bug =0;
                var month2bug =0;
                var month3bug =0;
                var month4bug =0;
                var month5bug =0;
                var month6bug =0;
                var month7bug =0;
                var month8bug =0;
                var month9bug =0;
                var month10bug =0;
                var month11bug =0;
                //------------ticket tag evolution par mois-------------------
                var currentmonthevol =0;
                var month1evol =0;
                var month2evol =0;
                var month3evol =0;
                var month4evol =0;
                var month5evol =0;
                var month6evol =0;
                var month7evol =0;
                var month8evol =0;
                var month9evol =0;
                var month10evol =0;
                var month11evol =0;


                var occurrencesbymonth = [];
                var occurrences = {};

                // sort tickets by month with tags
                for(t=0; t< data.tickets.length ;t++) {



                var tag = data.tickets[t].tags[0];
                    var created_at = data.tickets[t].created_at;


                    if (tag !== "maintenance" && tag !== "evolution" && tag !== "bug" & tag !== "assistance") {
                        tag = "------";
                    }
                    if (angular.isDefined(occurrences[tag])) {
                        occurrences[tag]++;
                    } else {
                        occurrences[tag] = 1;
                    }

                    if (occurrences["assistance"] == undefined) {
                        occurrences["assistance"] = 0

                    }
                    if (occurrences["bug"] == undefined) {
                        occurrences["bug"] = 0

                    }
                    if (occurrences["evolution"] == undefined) {
                        occurrences["evolution"] = 0

                    }
                    if (occurrences["maintenance"] == undefined) {
                        occurrences["maintenance"] = 0
                    }

                    var now = moment().format("YYYY-MM");
                    var now1 = moment().subtract(1, 'months').format("YYYY-MM");
                    var now2 = moment().subtract(2, 'months').format("YYYY-MM");
                    var now3 = moment().subtract(3, 'months').format("YYYY-MM");
                    var now4 = moment().subtract(4, 'months').format("YYYY-MM");
                    var now5 = moment().subtract(5, 'months').format("YYYY-MM");
                    var now6 = moment().subtract(6, 'months').format("YYYY-MM");
                    var now7 = moment().subtract(7, 'months').format("YYYY-MM");
                    var now8 = moment().subtract(8, 'months').format("YYYY-MM");
                    var now9 = moment().subtract(9, 'months').format("YYYY-MM");
                    var now10 = moment().subtract(10, 'months').format("YYYY-MM");
                    var now11 = moment().subtract(11, 'months').format("YYYY-MM");




                    var arrayRef2 = occurrencesbymonth['monthly'] ||
                        [{total:0,bug: 0,assist:0,maint:0,evol:0}, {total:0,bug: 0,assist:0,maint:0,evol:0},{total:0,bug: 0,assist:0,maint:0,evol:0}, {total:0,bug: 0,assist:0,maint:0,evol:0},{total:0,bug: 0,assist:0,maint:0,evol:0}, {total:0,bug: 0,assist:0,maint:0,evol:0},{total:0,bug: 0,assist:0,maint:0,evol:0}, {total:0,bug: 0,assist:0,maint:0,evol:0},{total:0,bug: 0,assist:0,maint:0,evol:0}, {total:0,bug: 0,assist:0,maint:0,evol:0},{total:0,bug: 0,assist:0,maint:0,evol:0}, {total:0,bug: 0,assist:0,maint:0,evol:0}];



                    if (created_at.includes(now) &&  tag == "assistance") {
                        arrayRef2[11].assist++;
                        currentmonthassist++
                        arrayRef2[11].total;
                        currentmonth++

                    }
                    if (created_at.includes(now1) && tag == "assistance") {
                        arrayRef2[10].assist++;
                        month1assist++
                        arrayRef2[10].total;
                        month1++
                    }
                    if (created_at.includes(now2) &&  tag == "assistance") {
                        arrayRef2[9].assist++;
                        month2assist++
                        arrayRef2[9].total;
                        month2++

                    }
                    if (created_at.includes(now3) &&  tag == "assistance") {
                        arrayRef2[8].assist++;
                        month3assist++
                        arrayRef2[8].total;
                        month3++
                    }
                    if (created_at.includes(now4) &&  tag == "assistance") {
                        arrayRef2[7].assist++;
                        month4assist++
                        arrayRef2[7].total;
                        month4++
                    }
                    if (created_at.includes(now5) && tag == "assistance") {
                        arrayRef2[6].assist++;
                        month5assist++
                        arrayRef2[6].total;
                        month5++
                    }
                    if (created_at.includes(now6) &&    tag == "assistance") {
                        arrayRef2[5].assist++;
                        month6assist++
                        arrayRef2[5].total;
                        month6++

                    }
                    if (created_at.includes(now7) &&  tag == "assistance") {
                        arrayRef2[4].assist++;
                        month7assist++
                        arrayRef2[4].total;
                        month7++

                    }
                    if (created_at.includes(now8) &&  tag == "assistance") {
                        arrayRef2[3].assist++;
                        month8assist++
                        arrayRef2[3].total;
                        month8++

                    }
                    if (created_at.includes(now9) &&  tag == "assistance") {
                        arrayRef2[2].assist++;
                        month9assist++
                        arrayRef2[2].total;
                        month9++

                    }
                    if (created_at.includes(now10) &&  tag == "assistance") {
                        arrayRef2[1].assist++;
                        month10assist++
                        arrayRef2[1].total;
                        month10++

                    }
                    if (created_at.includes(now11) &&  tag == "assistance") {
                        arrayRef2[0].assist++;
                        month11assist++
                        arrayRef2[0].total;
                        month11++

                    }

                    //---------------------------ticket maintenance par mois--------------------

                    if (created_at.includes(now) &&  tag == "maintenance") {
                        arrayRef2[11].maint++;
                        currentmonthmaint++
                        arrayRef2[11].total;
                        currentmonth++

                    }
                    if (created_at.includes(now1) &&  tag == "maintenance") {
                        arrayRef2[10].maint++;
                        month1maint++
                        arrayRef2[10].total;
                        month1++
                    }
                    if (created_at.includes(now2) &&  tag == "maintenance") {
                        arrayRef2[9].maint++;
                        month2maint++
                        arrayRef2[9].total;
                        month2++



                    }
                    if (created_at.includes(now3) &&  tag == "maintenance") {
                        arrayRef2[8].maint++;
                        month3maint++
                        arrayRef2[8].total;
                        month3++
                    }
                    if (created_at.includes(now4) &&  tag == "maintenance") {
                        arrayRef2[7].maint++;
                        month4maint++
                        arrayRef2[7].total;
                        month4++
                    }
                    if (created_at.includes(now5) &&  tag == "maintenance") {
                        arrayRef2[6].maint++;
                        month5maint++
                        arrayRef2[6].total;
                        month5++
                    }
                    if (created_at.includes(now6) && tag == "maintenance") {
                        arrayRef2[5].maint++;
                        month6maint++
                        arrayRef2[5].total;
                        month6++

                    }
                    if (created_at.includes(now7) &&  tag == "maintenance") {
                        arrayRef2[4].maint++;
                        month7maint++
                        arrayRef2[4].total;
                        month7++

                    }
                    if (created_at.includes(now8) &&  tag == "maintenance") {
                        arrayRef2[3].maint++;
                        month8maint++
                        arrayRef2[3].total;
                        month8++

                    }
                    if (created_at.includes(now9) && tag == "maintenance") {
                        arrayRef2[2].maint++;
                        month9maint++
                        arrayRef2[2].total;
                        month9++

                    }
                    if (created_at.includes(now10) &&  tag == "maintenance") {
                        arrayRef2[1].maint++;
                        month10maint++
                        arrayRef2[1].total;
                        month10++

                    }
                    if (created_at.includes(now11) && tag == "maintenance") {
                        arrayRef2[0].maint++;
                        month11maint++
                        arrayRef2[0].total;
                        month11++

                    }

                    //---------------------------ticket bug par mois--------------------

                    if (created_at.includes(now) &&  tag == "bug") {
                        arrayRef2[11].bug++;
                        currentmonthbug++
                        arrayRef2[11].total;
                        currentmonth++

                    }
                    if (created_at.includes(now1) &&  tag == "bug") {
                        arrayRef2[10].bug++;
                        month1bug++
                        arrayRef2[10].total;
                        month1++
                    }
                    if (created_at.includes(now2) &&  tag == "bug") {
                        arrayRef2[9].bug++;
                        month2bug++
                        arrayRef2[9].total;
                        month2++

                    }
                    if (created_at.includes(now3) &&  tag == "bug") {
                        arrayRef2[8].bug++;
                        month3bug++
                        arrayRef2[8].total;
                        month3++
                    }
                    if (created_at.includes(now4) &&  tag == "bug") {
                        arrayRef2[7].bug++;
                        month4bug++
                        arrayRef2[7].total;
                        month4++
                    }
                    if (created_at.includes(now5) &&  tag == "bug") {
                        arrayRef2[6].bug++;
                        month5bug++
                        arrayRef2[6].total;
                        month5++
                    }
                    if (created_at.includes(now6) && tag == "bug") {
                        arrayRef2[5].bug++;
                        month6bug++
                        arrayRef2[5].total;
                        month6++

                    }
                    if (created_at.includes(now7) &&  tag == "bug") {
                        arrayRef2[4].bug++;
                        month7bug++
                        arrayRef2[4].total;
                        month7++

                    }
                    if (created_at.includes(now8) &&  tag == "bug") {
                        arrayRef2[3].bug++;
                        month8bug++
                        arrayRef2[3].total;
                        month8++

                    }
                    if (created_at.includes(now9) && tag == "bug") {
                        arrayRef2[2].bug++;
                        month9bug++
                        arrayRef2[2].total;
                        month9++

                    }
                    if (created_at.includes(now10) &&  tag == "bug") {
                        arrayRef2[1].bug++;
                        month10bug++
                        arrayRef2[1].total;
                        month10++

                    }
                    if (created_at.includes(now11) && tag == "bug") {
                        arrayRef2[0].bug++;
                        month11bug++
                        arrayRef2[0].total;
                        month11++

                    }

                    //---------------------------ticket evolution par mois--------------------

                    if (created_at.includes(now) &&  tag == "evolution") {
                        arrayRef2[11].evol++;
                        currentmonthevol++
                        arrayRef2[11].total;
                        currentmonth++

                    }
                    if (created_at.includes(now1) &&  tag == "evolution") {
                        arrayRef2[10].evol++;
                        month1evol++
                        arrayRef2[10].total;
                        month1++
                    }
                    if (created_at.includes(now2) &&  tag == "evolution") {
                        arrayRef2[9].evol++;
                        month2evol++
                        arrayRef2[9].total;
                        month2++

                    }
                    if (created_at.includes(now3) &&  tag == "evolution") {
                        arrayRef2[8].evol++;
                        month3evol++
                        arrayRef2[8].total;
                        month3++
                    }
                    if (created_at.includes(now4) &&  tag == "evolution") {
                        arrayRef2[7].evol++;
                        month4evol++
                        arrayRef2[7].total;
                        month4++
                    }
                    if (created_at.includes(now5) &&  tag == "evolution") {
                        arrayRef2[6].evol++;
                        month5evol++
                        arrayRef2[6].total;
                        month5++
                    }
                    if (created_at.includes(now6) && tag == "evolution") {
                        arrayRef2[5].evol++;
                        month6evol++
                        arrayRef2[5].total;
                        month6++

                    }
                    if (created_at.includes(now7) &&  tag == "evolution") {
                        arrayRef2[4].evol++;
                        month7evol++
                        arrayRef2[4].total;
                        month7++

                    }
                    if (created_at.includes(now8) &&  tag == "evolution") {
                        arrayRef2[3].evol++;
                        month8evol++
                        arrayRef2[3].total;
                        month8++

                    }
                    if (created_at.includes(now9) && tag == "evolution") {
                        arrayRef2[2].evol++;
                        month9evol++
                        arrayRef2[2].total;
                        month9++

                    }
                    if (created_at.includes(now10) &&  tag == "evolution") {
                        arrayRef2[1].evol++;
                        month10evol++
                        arrayRef2[1].total;
                        month10++

                    }
                    if (created_at.includes(now11) && tag == "evolution") {
                        arrayRef2[0].evol++;
                        month11evol++
                        arrayRef2[0].total;
                        month11++

                    }


                }



                    occurrencesbymonth['monthly'] = arrayRef2;
                usertotalbymonth =[month11,month10,month9,month8,month7,month6,month5,month4,month3,month2,month1,currentmonth];

                userassistbymonth =[month11assist,month10assist,month9assist,month8assist,month7assist,month6assist,month5assist,month4assist,month3assist,month2assist,month1assist,currentmonthassist];
                    usermaintbymonth = [month11maint,month10maint,month9maint,month8maint,month7maint,month6maint,month5maint,month4maint,month3maint,month2maint,month1maint,currentmonthmaint];
                    userbugbymonth =[month11bug,month10bug,month9bug,month8bug,month7bug,month6bug,month5assist,month4bug,month3bug,month2bug,month1bug,currentmonthbug];
                    userevolbymonth = [month11evol,month10evol,month9evol,month8evol,month7evol,month6evol,month5evol,month4evol,month3evol,month2evol,month1evol,currentmonthevol];

                    console.log(userassistbymonth);
                    console.log(usermaintbymonth);
                console.log(userbugbymonth);
                console.log(userbugbymonth);


                    moment.locale('fr', {
                        months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_")});

                    dynamicdate =[moment(now11).format("MMMM YYYY"), moment(now10).format("MMMM YYYY"), moment(now9).format("MMMM YYYY"), moment(now8).format("MMMM YYYY"), moment(now7).format("MMMM YYYY"), moment(now6).format("MMMM YYYY"), moment(now5).format("MMMM YYYY"), moment(now4).format("MMMM YYYY"), moment(now3).format("MMMM YYYY"),moment(now2).format("MMMM YYYY"), moment(now1).format("MMMM YYYY"),moment(now).format("MMMM YYYY")];
                        console.log(user);
                var myuser = user.$$state.value;

                    $(function () {
                        $('#container').highcharts({
                            title: {
                                text: 'Répartition des tickets chez '+myuser,
                                x: -20 //center
                            },

                            xAxis: {
                                categories: dynamicdate
                            },
                            yAxis: {
                                title: {
                                    text: 'Nb tickets'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },

                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            },
                            series: [{
                                color:'#125688',
                                name: 'Total ticket',
                                data: usertotalbymonth
                            },{
                                color:'#ffc838',
                                type:'column',
                                name: 'Assistance ticket',
                                data: userassistbymonth
                            },{
                                color:'#458eff',
                                type:'column',
                                name:'Maintenance tickets',
                                data: usermaintbymonth
                            },{
                                type:'column',
                                color:'#fb3958',
                                name:'Bug tickets',
                                data: userbugbymonth
                            },{
                                color:'#6dc993',
                                type:'column',
                                name:'Evolutions tickets',
                                data: userevolbymonth
                            }]
                        });
                    });






                    console.log($scope.name);


                // end graphique and name
              console.log(data);
                console.log(occurrencesbymonth);
            });





        }])

    .controller('homeCtrl',['$state','$stateParams','$scope','dropdown','userdisplay','displayfilter','$q','$http',

        function ($state,$stateParams,$scope,dropdown,userdisplay,displayfilter,$q,$http) {





                    //-------------dropdown--------------

        $scope.displaycompany = function(){

            var token = "fd959281c193b795cb10d75089c40891d55d7f7bd618d4ea837f171c0ae5fcb0";
            dropdown.send(token).then(function (data) {

                $scope.usertab = data.organizations;
                console.log($scope.usertab);


            });

        }


            $scope.displayuser = function(id){

                $scope.companyview = true;
                //on initialise le token
                var token = "fd959281c193b795cb10d75089c40891d55d7f7bd618d4ea837f171c0ae5fcb0";


                                 //------------------ticket total par mois-------------------
                var currentmonth = 0;
                var month1 = 0;
                var month2 = 0;
                var month3 = 0;
                var month4 = 0;
                var month5 = 0;
                var month6 = 0;
                var month7 = 0;
                var month8 = 0;
                var month9 = 0;
                var month10 = 0;
                var month11 = 0;
                                     //------------ticket tag assistance par mois-------------------
                var currentmonthassist =0;
                var month1assist =0;
                var month2assist =0;
                var month3assist =0;
                var month4assist =0;
                var month5assist =0;
                var month6assist =0;
                var month7assist =0;
                var month8assist =0;
                var month9assist =0;
                var month10assist =0;
                var month11assist =0;
                                        //------------ticket tag maintenance par mois-------------------
                var currentmonthmaint =0;
                var month1maint =0;
                var month2maint =0;
                var month3maint =0;
                var month4maint =0;
                var month5maint =0;
                var month6maint =0;
                var month7maint =0;
                var month8maint =0;
                var month9maint =0;
                var month10maint =0;
                var month11maint =0;

                                    //----------------récupération du nom de l'entreprise-----------------


                var namecompany =
                    $http({
                        method: 'GET',
                        url: "https://cubber.zendesk.com/api/v2/organizations/"+id+".json",
                        dataType: 'json',
                        headers: {'Content-Type': 'application/json',   'Authorization': 'Bearer '+token}

                    }).then(function(response){

                        var company_name =response.data.organization.name;

                        return company_name
                    }) ;



                //création promesse 1 qui va chercher les noms des users en fonction de l'id de l'organisation
                var promise1 =

                    $http({
                    method: 'GET',
                    url: "https://cubber.zendesk.com/api/v2/organizations/"+id+"/users.json?sort_order=desc",

                    dataType: 'json',
                    headers: {'Content-Type': 'application/json',   'Authorization': 'Bearer '+token}

                }).then(function(response){

                      console.log(response);

                        return response
                    }) ;


                                                //---------------Promesse2----------------


                //création promesse 2 qui va pusher ds notre tableau les noms des users ainsi que leur nombre total de tickets

                var promesse2 =   promise1.then(function(data) {
                    var cleartab = [];
                    var allQ = [];
                    var recent = [];
                    var dynamicdate = [];
                    var recentArr = [];

                    console.log(data);

                    //boucle pour parourir tous les users et récupérer leur id et envoyer les noms ds un tableau vide
                    for(i = 0; i < data.data.users.length; i++){


                        // id des users
                        var userid = data.data.users[i].id;

                        //on push le noms des users et on récupère leur id
                        cleartab[userid] = {"username":data.data.users[i].name};
                        recent[userid] =  data.data.users[i].name ;
                        console.log(recent[userid]);




                        // on va chercher les tickets en fonction des id des noms
                        allQ.push( $http({
                            method: 'GET',
                            url: "https://cubber.zendesk.com/api/v2/users/"+userid+"/tickets/requested.json?sort_order=desc",
                            dataType: 'json',
                            headers: {'Content-Type': 'application/json',
                                      'Authorization': 'Bearer '+token}

                        })
                           .then(function(data){
                               //on initialise notre variable comme objet pour etre pret à le pusher dans notre tableau (filtre)
                               var occurrences = {};


                                for(j=0; j< data.data.tickets.length ;j++) {
                                    //on récupère l'id de nos users
                                    var requesterid = data.data.tickets[j].requester_id;
                                    var created_at = data.data.tickets[j].created_at;


                                    console.log(created_at);

                                    var tickettitle = data.data.tickets[j].subject;


                                    var ticketstatus = data.data.tickets[j].status;


                                    //-----------------FIlTRES-------------------------


                                    //on récupère la valeur du tag pour nos tickets
                                    var tag = data.data.tickets[j].tags[0];


                                    if (tag !== "maintenance" && tag !== "evolution" && tag !== "bug" & tag !== "assistance") {
                                        tag = "------";
                                    }
                                    if (angular.isDefined(occurrences[tag])) {
                                        occurrences[tag]++;
                                    } else {
                                        occurrences[tag] = 1;
                                    }

                                    if (occurrences["assistance"] == undefined) {
                                        occurrences["assistance"] = 0

                                    }
                                    if (occurrences["bug"] == undefined) {
                                        occurrences["bug"] = 0

                                    }
                                    if (occurrences["evolution"] == undefined) {
                                        occurrences["evolution"] = 0

                                    }
                                    if (occurrences["maintenance"] == undefined) {
                                        occurrences["maintenance"] = 0
                                    }
                                    // on push le nombre de tickets par filtres
                                    cleartab[requesterid]['tickassistance'] = occurrences["assistance"];
                                    cleartab[requesterid]['tickbug'] = occurrences["bug"];
                                    cleartab[requesterid]['tickmaintenance'] = occurrences["maintenance"];

                                    //on push le nombre de tickets total par user
                                    cleartab[requesterid]['nbtickets'] = data.data.count;
                                    cleartab[requesterid]['id'] = requesterid;

                                    //on push dynamiquement nos tickets
                                    var arrayRef = cleartab[requesterid]['tickets'] || [];
                                    cleartab[requesterid]['tickets'] = arrayRef.concat([{
                                        "date": created_at,
                                        "titre": tickettitle,
                                        "status": ticketstatus,
                                        "tag":tag
                                    }]);



                                    recentArr[requesterid] = recentArr[requesterid] || [];
                                    recentArr[requesterid]=  recentArr[requesterid].concat([{
                                        "date": created_at,
                                        "titre": tickettitle,
                                        "status": ticketstatus,
                                        "tag": tag,
                                        "id": requesterid,
                                        "name" : recent[requesterid]
                                    }]);


                                    console.log(recentArr);


                                    //--------------------------Monthly-------------------------


                                    var now = moment().format("YYYY-MM");
                                    var now1 = moment().subtract(1, 'months').format("YYYY-MM");
                                    var now2 = moment().subtract(2, 'months').format("YYYY-MM");
                                    var now3 = moment().subtract(3, 'months').format("YYYY-MM");
                                    var now4 = moment().subtract(4, 'months').format("YYYY-MM");
                                    var now5 = moment().subtract(5, 'months').format("YYYY-MM");
                                    var now6 = moment().subtract(6, 'months').format("YYYY-MM");
                                    var now7 = moment().subtract(7, 'months').format("YYYY-MM");
                                    var now8 = moment().subtract(8, 'months').format("YYYY-MM");
                                    var now9 = moment().subtract(9, 'months').format("YYYY-MM");
                                    var now10 = moment().subtract(10, 'months').format("YYYY-MM");
                                    var now11 = moment().subtract(11, 'months').format("YYYY-MM");


                                    var arrayRef2 = cleartab[requesterid]['monthly'] ||
                                       [{now11: 0,assist:0,maint:0}, {now10: 0,assist:0,maint:0},{now9: 0,assist:0,maint:0}, {now8: 0,assist:0,maint:0},{now7: 0,assist:0,maint:0}, {now6: 0,assist:0,maint:0},{now5: 0,assist:0,maint:0}, {now4: 0,assist:0,maint:0},{now3: 0,assist:0,maint:0}, {now2: 0,assist:0,maint:0},{now1: 0,assist:0,maint:0}, {now: 0,assist:0,maint:0}];


                                        //--------------------- tickets totaux by month-----------------


                                    if (created_at.includes(now) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[11].now++;
                                        currentmonth++
                                    }
                                    if (created_at.includes(now1) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[10].now1++;
                                        month1++
                                    }
                                    if (created_at.includes(now2) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[9].now2++;
                                        month2++

                                    }
                                    if (created_at.includes(now3) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[8].now3++;
                                        month3++
                                    }
                                    if (created_at.includes(now4) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[7].now4++;
                                        month4++
                                    }
                                    if (created_at.includes(now5) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[6].now5++;
                                        month5++
                                    }
                                    if (created_at.includes(now6) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[5].now6++;
                                        month6++
                                    }
                                    if (created_at.includes(now7) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[4].now7++;
                                        month7++
                                    }
                                    if (created_at.includes(now8) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[3].now8++;
                                        month8++
                                    }
                                    if (created_at.includes(now9) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[2].now9++;
                                        month9++
                                    }
                                    if (created_at.includes(now10) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[1].now10++;
                                        month10++
                                    }
                                    if (created_at.includes(now11) && requesterid == cleartab[requesterid]['id']) {
                                        arrayRef2[0].now11++;
                                        month11++
                                    }

                                    //----------------des que le tag est assitance on récupère le user et la date du ticket tickets assistance par mois----------
                                    if (created_at.includes(now) && requesterid == cleartab[requesterid]['id'] && tag == "assistance") {
                                        arrayRef2[11].assist++;
                                        currentmonthassist++

                                    }
                                    if (created_at.includes(now1) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[10].assist++;
                                        month1assist++
                                    }
                                    if (created_at.includes(now2) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[9].assist++;
                                        month2assist++

                                    }
                                    if (created_at.includes(now3) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[8].assist++;
                                        month3assist++
                                    }
                                    if (created_at.includes(now4) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[7].assist++;
                                        month4assist++
                                    }
                                    if (created_at.includes(now5) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[6].assist++;
                                        month5assist++
                                    }
                                    if (created_at.includes(now6) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[5].assist++;
                                        month6assist++

                                    }
                                    if (created_at.includes(now7) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[4].assist++;
                                        month7assist++

                                    }
                                    if (created_at.includes(now8) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[3].assist++;
                                        month8assist++

                                    }
                                    if (created_at.includes(now9) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[2].assist++;
                                        month9assist++

                                    }
                                    if (created_at.includes(now10) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[1].assist++;
                                        month10assist++

                                    }
                                    if (created_at.includes(now11) && requesterid == cleartab[requesterid]['id']  && tag == "assistance") {
                                        arrayRef2[0].assist++;
                                        month11assist++

                                    }

                                    //---------------------------ticket maintenance par mois--------------------

                                    if (created_at.includes(now) && requesterid == cleartab[requesterid]['id'] && tag == "maintenance") {
                                        arrayRef2[11].maint++;
                                        currentmonthmaint++

                                    }
                                    if (created_at.includes(now1) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[10].maint++;
                                        month1maint++
                                    }
                                    if (created_at.includes(now2) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[9].maint++;
                                        month2maint++

                                    }
                                    if (created_at.includes(now3) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[8].maint++;
                                        month3maint++
                                    }
                                    if (created_at.includes(now4) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[7].maint++;
                                        month4maint++
                                    }
                                    if (created_at.includes(now5) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[6].maint++;
                                        month5maint++
                                    }
                                    if (created_at.includes(now6) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[5].maint++;
                                        month6maint++

                                    }
                                    if (created_at.includes(now7) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[4].maint++;
                                        month7maint++

                                    }
                                    if (created_at.includes(now8) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[3].maint++;
                                        month8maint++

                                    }
                                    if (created_at.includes(now9) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[2].maint++;
                                        month9maint++

                                    }
                                    if (created_at.includes(now10) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[1].maint++;
                                        month10maint++

                                    }
                                    if (created_at.includes(now11) && requesterid == cleartab[requesterid]['id']  && tag == "maintenance") {
                                        arrayRef2[0].maint++;
                                        month11maint++

                                    }




                                    cleartab[requesterid]['monthly'] = arrayRef2;


                                        //--------------close for loop--------------
                                }

                               console.log(now11);





                                //----------- on définit nos tableaux pour les graphiques---------
                               var companytotalbymonth =[];
                               var companyassistbymonth = [];
                               var companyamaintbymonth = [];


                               moment.locale('fr', {
                                   months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_")});

                               dynamicdate =[moment(now11).format("MMMM YYYY"), moment(now10).format("MMMM YYYY"), moment(now9).format("MMMM YYYY"), moment(now8).format("MMMM YYYY"), moment(now7).format("MMMM YYYY"), moment(now6).format("MMMM YYYY"), moment(now5).format("MMMM YYYY"), moment(now4).format("MMMM YYYY"), moment(now3).format("MMMM YYYY"),moment(now2).format("MMMM YYYY"), moment(now1).format("MMMM YYYY"),moment(now).format("MMMM YYYY")];


                               return [cleartab[requesterid],recentArr[requesterid]];
                               // return


                           })

                        );


                    }


                        // une fois toutes les requêtes terminées, on envoie à la view notre custom tableau contenant le noms des users ainsi que le nombre total de tickets
                        $q.all(allQ,dynamicdate,namecompany).then(function(data){


                               // ----------tableaux pour le graphique--------

                            companytotalbymonth =[month11,month10,month9,month8,month7,month6,month5,month4,month3,month2,month1,currentmonth];
                            companyassistbymonth =[month11assist,month10assist,month9assist,month8assist,month7assist,month6assist,month5assist,month4assist,month3assist,month2assist,month1assist,currentmonthassist];
                            companyamaintbymonth = [month11maint,month10maint,month9maint,month8maint,month7maint,month6maint,month5maint,month4maint,month3maint,month2maint,month1maint,currentmonthmaint];

                            var name =namecompany.$$state.value;

                            $scope.customarray = data;
                            var work = [];


                            angular.forEach(data, function(values, keys) {
                                angular.forEach(data[keys][1],function(value,key){
                                    console.log(key + ': ' + value);
                                    work.push(value);


                                })

                            });

                            $scope.test = work;


                            $(function () {
                                $('#container').highcharts({
                                    title: {
                                        text: 'Répartition des tickets chez '+name,
                                        x: -20 //center
                                    },

                                    xAxis: {
                                        categories: dynamicdate
                                    },
                                    yAxis: {
                                        title: {
                                            text: 'Nb tickets'
                                        },
                                        plotLines: [{
                                            value: 0,
                                            width: 1,
                                            color: '#808080'
                                        }]
                                    },

                                    legend: {
                                        layout: 'vertical',
                                        align: 'right',
                                        verticalAlign: 'middle',
                                        borderWidth: 0
                                    },
                                    series: [{
                                        color:'#125688',
                                        name: 'Total tickets',
                                        data: companytotalbymonth
                                    },{
                                        color:'#ffc838',
                                        type: 'column',
                                        name:'Assistance tickets',
                                        data: companyassistbymonth
                                    },{
                                        color:'#458eff',
                                        type: 'column',
                                        name:'Maintenance tickets',
                                        data: companyamaintbymonth
                                    }]
                                });
                            });



                        });

                });

                                        //----------------------FIN PROMESSE2------------------


            };
    }])









;
