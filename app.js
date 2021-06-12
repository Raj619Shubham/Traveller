$(document).ready(function(){
    let trainNo,journey_date;
    $('#live_status_btn').click(function(){
        trainNo = $('#train_no').val();
        journey_date = $('#journey_date').val();
        journey_date = journey_date.replace("-","");
        journey_date = journey_date.replace("-","");

        // Create an ajax request
        $.ajax({
            url:"https://indianrailapi.com/api/v2/livetrainstatus/apikey/8371e1a8e0fc9c92d49c125663889a1c/trainnumber/" +trainNo+ "/date/" +journey_date,
            success:function(data){
                console.log(data);
                let station_name = data.CurrentStation.StationName;
                let arrival = data.CurrentStation.ActualArrival;
                let delay = data.CurrentStation.DelayInArrival;
                let sample = "";


                routeArr = data.TrainRoute;
                for(let i = 0;i<routeArr.length;i++){
                    sample = sample + `
                              <tr>
                                 <td>${routeArr[i].StationName}</td>
                                 <td>${routeArr[i].ActualArrival}</td>
                                 <td>${routeArr[i].ActualDeparture}</td>
                                 <td>${routeArr[i].DelayInArrival}</td>
                              </tr>
                              `;
                }

                $('#current_status').html(` <h4>
                                             Crossed
                                              <span class="text-danger"> ${station_name} </span>
                                               at ${arrival}
                                            </h4>
                                            <p>Delayed by ${delay}</p>`);

                $('#status_table').html(`   <table class="table table-striped" style="width:100%;">
                                               <thead>
                                                  <tr>
                                                    <th>Station</th>
                                                    <th>Arrival Status</th>
                                                    <th>Departure status</th>
                                                    <th>Delay</th>
                                                  </tr>
                                               </thead>
                                               <tbody>
                                                ${sample}
                                               </tbody>
                                            </table>
                `);
            },
            error: function(err){
                alert("Some Error Occured");
            }
        })
    })

    let station_code;
    let sample1 = "";
    $('#station_status_btn').click(function(){
        station_code = $('#station_code').val();
        $.ajax({
            url:"https://indianrailapi.com/api/v2/LiveStation/apikey/8371e1a8e0fc9c92d49c125663889a1c/StationCode/"+station_code+"/hours/4",
            success: function(data){
                console.log(data)   

                Trains = data.Trains;
                for(let i = 0;i<Trains.length;i++){
                    sample1 = sample1 + `
                              <tr>
                                 <td>${Trains[i].Name}</td>
                                 <td>${Trains[i].Number}</td>
                                 <td>${Trains[i].ExpectedArrival}</td>
                                 <td>${Trains[i].ExpectedDeparture}</td>
                              </tr>
                              `;
                }

                $('#station_table').html(`   <table class="table table-striped" style="width:100%;">
                                               <thead>
                                                  <tr>
                                                    <th>Train Name</th>
                                                    <th>Train Number</th>
                                                    <th>Expected Arrival</th>
                                                    <th>Expected Departure</th>
                                                  </tr>
                                               </thead>
                                               <tbody>
                                                ${sample1}
                                               </tbody>
                                            </table>
                `);


            },
            error: function(){
                alert("Somde error occured!!")
            }
        })
    })


    
    let train_number_route;
    let sample2 = "";
    $('#train_route_btn').click(function(){
        train_number_route = $('#train_number_route').val();
        $.ajax({
            url:"https://indianrailapi.com/api/v2/TrainSchedule/apikey/8371e1a8e0fc9c92d49c125663889a1c/TrainNumber/"+train_number_route,
            success: function(data){
                console.log(data)   

               route = data.Route;
                for(let i = 0;i< route.length;i++){
                    sample2 = sample2 + `
                              <tr>
                                 <td>${route[i].StationName}</td>
                                 <td>${route[i].ArrivalTime}</td>
                                 <td>${route[i].DepartureTime}</td>
                                 <td>${route[i].Distance}</td>
                              </tr>
                              `;
                }

                $('#route_table').html(`   <table class="table table-striped" id="routeTable" style="width:100%;">
                                               <thead>
                                                  <tr>
                                                    <th>Station Name</th>
                                                    <th>Arrival Time</th>
                                                    <th>Departure Time</th>
                                                    <th>Distance</th>
                                                  </tr>
                                               </thead>
                                               <tbody>
                                                ${sample2}
                                               </tbody>
                                            </table>
                `);


            },
            error: function(){
                alert("Somde error occured!!")
            }
        })
    })


    let all_train_station_code;
    let sample3 = "";
    $('#All_trains_btn').click(function(){
     all_train_station_code = $('#all_train_station_code').val();
        $.ajax({
            url:"https://indianrailapi.com/api/v2/AllTrainOnStation/apikey/8371e1a8e0fc9c92d49c125663889a1c/StationCode/" + all_train_station_code,
            success: function(data){
                console.log(data)   

               All_Trains = data.Trains;

                for(let i = 0;i< All_Trains.length;i++){
                    sample3 = sample3 + `
                              <tr>
                                 <td>${All_Trains[i].TrainName}</td>
                                 <td>${All_Trains[i].Source} / ${All_Trains[i].Destination} </td>
                                 <td>${All_Trains[i].ArrivalTime} / ${All_Trains[i].DepartureTime} </td>
                              </tr>
                              `;
                }

                $('#All_trains_table').html(`<table class="table table-striped" id="routeTable" style="width:100%;">
                                               <thead>
                                                  <tr>
                                                    <th>Train Name</th>
                                                    <th>Source/Destination</th>
                                                    <th>Arrival/ Departure</th>
                                                  </tr>
                                               </thead>
                                               <tbody>
                                                ${sample3}
                                               </tbody>
                                            </table>
                `);


            },
            error: function(){
                alert("Somde error occured!!")
            }
        })
    })

}) ;


$(".modal").on("hidden.bs.modal", function(){
    $(".modal-body1").html("");
});


var preloader = document.getElementById('loading');
     function loader(){
         preloader.style.display = 'none';
     }
