//---- Initialize Firebase-----------------------------------------------------------------------
  var config = {
    apiKey: "AIzaSyDyKaH2nVG6_d8kH-AMcaRf73l6qOl8zpc",
    authDomain: "rd-year-project-509e1.firebaseapp.com",
    databaseURL: "https://rd-year-project-509e1.firebaseio.com",
    projectId: "rd-year-project-509e1",
    storageBucket: "rd-year-project-509e1.appspot.com",
    messagingSenderId: "187157927542"
  };
  firebase.initializeApp(config);
  
//------------CUSTOMER TABLE----------------------------------------------------------------------

  var tblCounts = document.getElementById("customerTable");
  //initialise row counter
  var rowIndex = 1;
  //connect to customer node in DB
  const customerRef = firebase.database().ref("cabs/customers/").orderByChild("name");
  //loop through each item | put in html table row
  customerRef.once("value",function(snapshot) {
  	snapshot.forEach(function(itemSnapshot) {
  		//get data for one item | everything except key
  		var itemData = itemSnapshot.val();
  		//add row to table
  		var row = tblCounts.insertRow(rowIndex);
  		//populate cells
  		row.insertCell(0).appendChild(document.createTextNode(itemSnapshot.key));
  		row.insertCell(1).appendChild(document.createTextNode(itemData.name));
  		row.insertCell(2).appendChild(document.createTextNode(itemData.email));
  	  row.insertCell(3).appendChild(document.createTextNode(itemData.phone));
  		row.insertCell(4).appendChild(document.createTextNode(itemData.verified));
  		rowIndex += 1;
  	})
  })

//-------------------JOURNEY TABLE----------------------------------------------------------

  var tableCounts = document.getElementById("journeyTable");
  //initialise row counter
  var rIndex = 1;
  //connect to journey node in DB
  const journeyRef = firebase.database().ref("cabs/journeys/").orderByChild("long");
  //loop through each item | put in html table row
  journeyRef.once("value",function(snapshot) {
    snapshot.forEach(function(itemSnapshot) {
      //get data for one item | everything except key
      var itemD = itemSnapshot.val();
      //add row to table
      var row2 = tableCounts.insertRow(rIndex);
      //populate cells
      row2.insertCell(0).appendChild(document.createTextNode(itemSnapshot.key));//rIndex+"."
       row2.insertCell(1).appendChild(document.createTextNode(itemD.startLat));
      row2.insertCell(2).appendChild(document.createTextNode(itemD.startLong));
      row2.insertCell(3).appendChild(document.createTextNode(itemD.endLat));
      row2.insertCell(4).appendChild(document.createTextNode(itemD.endLong));
      row2.insertCell(5).appendChild(document.createTextNode(itemD.registration));
      row2.insertCell(6).appendChild(document.createTextNode(itemD.customer));
      row2.insertCell(7).appendChild(document.createTextNode(itemD.price));
      
      rIndex += 1;
    })
  })

//-------------------VEHICLE TABLE----------------------------------------------------------

  var tCounts = document.getElementById("vehicleTable");
  //initialise row counter
  var rIndex2 = 1;
  //connect to vehicle node in DB
  const vehicleRef = firebase.database().ref("cabs/vehicles/").orderByChild("make");
  //loop through each item | put in html table row
  vehicleRef.once("value",function(snapshot) {
    snapshot.forEach(function(itemSnapshot) {
      //get data for one item | everything except key
      var itemD2 = itemSnapshot.val();
      //add row to table
      var row3 = tCounts.insertRow(rIndex2);
      //populate cells
      row3.insertCell(0).appendChild(document.createTextNode(itemD2.registration)); 
      row3.insertCell(1).appendChild(document.createTextNode(itemD2.make));
      row3.insertCell(2).appendChild(document.createTextNode(itemD2.model));
      row3.insertCell(3).appendChild(document.createTextNode(itemD2.long));
      row3.insertCell(4).appendChild(document.createTextNode(itemD2.lat));
	  row3.insertCell(5).appendChild(document.createTextNode(itemD2.jobID));
      row3.insertCell(6).appendChild(document.createTextNode(itemD2.status));
      
      rIndex2 += 1;
    })
  })


//----------MAP----------------------------------------------------------
var map;
function initMap() {

var vehicleLocation = {lat: 51.8985, lng: -8.4756};

 map = new google.maps.Map(document.getElementById("map"), {
  zoom: 14,
  center: vehicleLocation
  });

 var marker = new google.maps.Marker({
  position: vehicleLocation,
  map: map,
  title: "City Center"
 });
}



//-------------CREATE JOURNEY OBJECTS WITH MAP MARKERS-----------------------

  //connect to journey node in DB
  const journeyForMap = firebase.database().ref("cabs/journeys/").orderByChild("long");
  //array for journey objects
  var journeys=[];
  //loop through each item 
  journeyForMap.once("value",function(snapshot) {
    snapshot.forEach(function(itemSnapshot) {
      //get data for one item | everything except key
      var arrItem = itemSnapshot.val();
      //create object for each journey
      var newJourney = {
        "long" : arrItem.long,
        "latt" : arrItem.lat,
        "reg" : arrItem.registration
      }
      //add object to array
      journeys.push(newJourney);
    })
    var regNum = "162 D 55443";
    var theJourney;
    var contentString;
    var mark;
    //loop to check array contents
    for(var i = 0; i < journeys.length; i++) {
    console.log(journeys[i].long + " * " + journeys[i].latt + " " + journeys[i].reg);

    var dt = new Date();
    var tm = dt.getHours() + " : " + dt.getMinutes();

      var location = {lat: journeys[i].latt, lng: journeys[i].long };
          contentString = "Vehicle location\n" + "Lattitude: " +journeys[i].latt;
          contentString += "Longitude: "+journeys[i].long;
          contentString += "Registration: " + journeys[i]["reg"];
      
      var mark = new google.maps.Marker({
                  position: location,
                  map: map,
                  title: "Vehicle: " + journeys[i]["reg"] + "\nLocation: " + journeys[i].latt + " " 
                  + journeys[i].long +"\nTime: " + tm
      });
      var infoWindow = new google.maps.InfoWindow({
        content: contentString
      });

      //find object via reg
      if(journeys[i]["reg"] === regNum){
        theJourney = journeys[i];
        console.log("Found: " + theJourney.latt);

      }
    }
    
    

  }) 
  //--------GET REG ENTRY----------------------------------------------------

document.getElementById('submit').addEventListener('click', getText);
var regValue;
function getText() {
  regValue = document.getElementById('reg-num').value;
  var x = regValue;
  alert("in getText");
  console.log(x);
  
//------------CHART---------------------------------------------------
var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Journeys",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
});

//----------------GEOCODE-ADDRESS---------------------------------------
function geocodeAddress(address) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({'address' : address}, function(results, status) {
    if(status === google.maps.GeocoderStatus.OK) {
      console.log('Geocoded address: ', results[0].geometry.location.toString());
    } else {
      alert('Geocode unsuccessful: ' + status);
    }
  });
}

//-----------DIRECTIONS--------------------------------------------------

var points=[];
function getRoute() {
  var directionsService  = new google.maps.DirectionsService();
  var poly = new google.maps.Polyline({strokeColor:"FF0000",strokeWeight: 4});
  var request = {
                  origin : new google.maps.LatLng(points[0].lat,points[0].long),
                  destination : new google.maps.LatLng(points[1].lat,points[1].long),
                  travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  directionsService.route(request,function(response,status){
    if (status == google.maps.DirectionsStatus.OK) {
      //status ok - render map
      new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions: poly,
        directions: response
      });
    }
  })
   
}

//St Patricks St: Geocoded address:  (51.8984173, -8.472407299999986)
//Harbour View Road: Geocoded address:  (51.90385980000001, -8.505253000000039)
//Carrigaline: Geocoded address:  (51.8129635, -8.392445199999997)





















  
