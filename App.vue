<template>
  <div id="app" class="container">

    <!--NAVIGATION  -->
    <nav class="navbar fixed-top navbar-dark bg-primary">
      <div class="container-fluid">
          <a href="#" class="navbar-brand">Administration</a>
          <div id="links">
            <a href="#vehTable">Vehicles</a>
            <a href="#jourTable">Journeys</a>
            <a href="#custTable">Customers</a>
            <a href="#bookTable">Bookings</a>
            <a href="#mapid">Map</a>
          </div>
      </div>
    </nav>
    
    <!-- VEHICLES -->
    <div class="panel panel-default" id="vehTable">
      <div class="panel-heading">
        <h3 class="text-info">Vehicles</h3>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Registration</th>
              <th>Make</th>
              <th>Model</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Job ID</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vehicle in vehicles" :key="vehicle.id">
              <td>{{vehicle.registration}}</td>
              <td>{{vehicle.make}}</td>
              <td>{{vehicle.model}}</td>
              <td>{{vehicle.lat}}</td>
              <td>{{vehicle.long}}</td>
              <td>{{vehicle.jobID}}</td>
              <td>{{vehicle.status}}</td> 
              <td><i class="fas fa-pen"  v-on:click.prevent="updateStatus(vehicle)"></i></td>
              <td><i class="fas fa-trash-alt" v-on:click="removeVehicle(vehicle)"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- ADD VEHICLE -->
    <div class="panel panel-default">
      <div class="panel-heading"><h3>Add Vehicle</h3></div>
      <div class="panel-body">
        <form id="form" class="form-inline" v-on:submit.prevent="addVehicle">
          <div class="form-group">
            <label for="registration">Registration: </label>
            <input type="text" id="registration" class="form-control" v-model="newVehicle.registration">
          </div>
          <div class="form-group">
            <label for="make">Make: </label>
            <input type="text" id="make" class="form-control" v-model="newVehicle.make">
          </div>
          <div class="form-group">
            <label for="model">Model: </label>
            <input type="text" id="model" class="form-control" v-model="newVehicle.model">
          </div>
          <input type="submit" class="btn btn-primary" value="Add Vehicle">
        </form>
      </div>
    </div>
    <hr>
    <!-- JOURNEYS -->
    <div class="panel panel-default"  id="jourTable">
      <div class="panel-heading">
        <h3 class="text-info">Journeys</h3>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Registration</th>
              <th>Start Longitude</th>
              <th>Start Latitude</th>
              <th>End Longitude</th>
              <th>End Latitude</th>
              <th>Price</th>
              <th>Delete</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="journey in journeys " :key="journey.id">
              <td>{{journey['.key'].substr(0,7)}}</td>
              <td>{{journey.customer}}</td>
              <td>{{journey.registration}}</td>
              <td>{{journey.startLong}}</td>
              <td>{{journey.startLat}}</td>
              <td>{{journey.endLong}}</td>
              <td>{{journey.endLat}}</td>
              <td>{{journey.price}}</td>
              <td><i class="fas fa-trash-alt" v-on:click="removeJourney(journey)"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- ADD JOURNEY -->
    <div class="panel panel-default">
      <div class="panel-heading"><h3>Add Journey</h3></div>
      <div class="panel-body">
        <form id="form" class="form-inline form-j" v-on:submit.prevent="addJourney">
          <div class="form-group">
            <label for="registration">Customer: </label>
            <input type="text" id="registration" class="form-control" v-model="newJourney.customer">
          </div>
          <div class="form-group">
            <label for="make">Vehicle: </label>
            <input type="text" id="vehicle" class="form-control" v-model="newJourney.registration">
          </div>
          <div class="form-group">
            <label for="model">Start(Long): </label>
            <input type="text" id="sLong" class="form-control" v-model="newJourney.startLong">
          </div>
          <div class="form-group">
            <label for="model">Start(Lat): </label>
            <input type="text" id="sLat" class="form-control" v-model="newJourney.startLat">
          </div>
          <div class="form-group">
            <label for="model">End(Long): </label>
            <input type="text" id="eLong" class="form-control" v-model="newJourney.endLong">
          </div>
          <div class="form-group">
            <label for="model">End(Lat): </label>
            <input type="text" id="eLat" class="form-control" v-model="newJourney.endLat">
          </div>
          <div class="form-group">
            <label for="model">Price: </label>
            <input type="text" id="price" class="form-control" v-model="newJourney.price">
          </div>
          <input type="submit" class="btn btn-primary" value="Add Journey">
        </form>
      </div>
    </div>
    <hr>

    

    <!-- CUSTOMERS -->
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="text-info">Customers</h3>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-bordered table-hover" id="custTable">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Verified</th>
              <th>Verify</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id" >
              <td>{{customer['.key'].substr(0,7)}}</td>
              <td>{{customer.name}}</td>
              <td>{{customer.email}}</td>
              <td>{{customer.phone}}</td>
              <td contenteditable="true">{{customer.verified}}</td>
              <td><i class="fas fa-user-edit" v-on:click.prevent="updateCustomer(customer)"></i></td>
              <td><i class="fas fa-trash-alt" v-on:click="removeCustomer(customer)"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ADD CUSTOMER -->
    <div class="panel panel-default">
      <div class="panel-heading"><h3>Add Customer</h3></div>
      <div class="panel-body">
        <form id="form" class="form-inline" v-on:submit.prevent="addCustomer">
          <div class="form-group">
            <label for="registration">Name: </label>
            <input type="text" id="name" class="form-control" v-model="newCustomer.name">
          </div>
          <div class="form-group">
            <label for="make">Email: </label>
            <input type="text" id="email" class="form-control" v-model="newCustomer.email">
          </div>
          <div class="form-group">
            <label for="model">Phone: </label>
            <input type="text" id="phone" class="form-control" v-model="newCustomer.phone">
          </div>
          <input type="submit" class="btn btn-primary" value="Add Customer">
        </form>
      </div>
    </div>
    <hr>

    <!-- BOOKINGS -->
    <div class="panel panel-default"  id="bookTable">
      <div class="panel-heading">
        <h3 class="text-info">Bookings</h3>
      </div>
      <div class="panel-body">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date</th>
              <th>Time</th>
              <th>Car</th>
              <th>Start</th>
              <th>Finish</th>
              <th>Delete</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in bookings " :key="booking.id">
              <td>{{booking['.key'].substr(0,7)}}</td>
              <td>{{booking.name}}</td>
              <td>{{booking.phone}}</td>
              <td>{{booking.email}}</td>
              <td>{{booking.date}}</td>
              <td>{{booking.time}}</td>
              <td>{{booking.carType}}</td>
              <td>{{booking.pick_up}}</td>
              <td>{{booking.drop_off}}</td>
              <td><i class="fas fa-trash-alt" v-on:click="removeBooking(booking)"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <h3 class="text-info">Vehicle Locations</h3>
    <!--  -->
    <!-- <div id="map">
      <g-maps />

    </div> -->
    <hr id="map-end">
    
    

    


    <!-- APP DIV -->
  </div>
</template>


<script>
import Firebase from 'firebase'
import GMaps from "./components/GMaps";





let config = {
    apiKey: "**********************",
    authDomain: "**************************",
    databaseURL: "*************************************",
    projectId: "rd-year-project-509e1",
    storageBucket: "**************************",
    messagingSenderId: "***********************"
};

let app = Firebase.initializeApp(config);
let db = app.database();
let vehicleRef = db.ref('cabs/vehicles')
let journeyRef = db.ref('cabs/journeys')
let customerRef = db.ref('cabs/customers')
let bookingRef = db.ref('cabs/bookings/jZUo7T8ZbIW5aWWvyqD8p4CC0KB2')

// 

export default {
  name: 'App',

  components: {
        GMaps
        
    },
  firebase: {
    vehicles: vehicleRef,
    journeys: journeyRef.orderByChild('key'),
    customers: customerRef,
    bookings: bookingRef.orderByChild('key')
     
  },
  data() {
    return {
      newVehicle: {
        registration: '',
        make:'',
        model: '',
        lat: 0,
        long:0,
        jobID:-1,
        status: 0
      },
      newCustomer: {
        name: '',
        email:'',
        phone: '',
        verified: 'N'
      },
      newJourney: {
        customer: '',
        registration: '',
        startLong: '',
        startLat: '',
        endLong: '',
        endLat: '',
        price: ''
      }
    }
  },
  methods: {

    calcDistance: function(){
      var R = 6371e3; // metres
      var φ1 = this.newJourney.startLat.toRadians();
      var φ2 = this.newJourney.endLat.toRadians();
      var Δφ = (this.newJourney.endLat-this.newJourney.startLat).toRadians();
      var Δλ = (this.newJourney.endLong-this.newJourney.startLong).toRadians();

      var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      var d = R * c;

      return d
    },
    getPrice: function() {
      var price;
      var distance = calcDistance();
      price = 3.80 + (1.50 * distance) ;
      return price;
    },
    addVehicle: function() {
      vehicleRef.push(this.newVehicle);
      this.newVehicle.registration = '';
      this.newVehicle.make = '';
      this.newVehicle.model = '';
    },
    addJourney: function() {
      journeyRef.push(this.newJourney);
        this.customer  = '';
        this.registration  = '';
        this.startLong = '';
        this.startLat  = '';
        this.endLong = '';
        this.endLat  = '';
        this.price = '';

    },
    addCustomer: function() {
      customerRef.push(this.newCustomer);
      this.newCustomer.name = '';
      this.newCustomer.email = '';
      this.newCustomer.phone = '';
    },
    removeVehicle: function(vehicle) {
      vehicleRef.child(vehicle['.key']).remove();
    },
    removeJourney: function(journey) {
      journeyRef.child(journey['.key']).remove();
    },
    removeCustomer: function(customer) {
      customerRef.child(customer['.key']).remove();
    },
    removeBooking: function(booking) {
       bookingRef.child(booking['.key']).remove();
    },
    updateCustomer: function(customer) {
      if(customer.verified === ' ' || customer.verified === 'N') {
        customerRef.child(customer['.key']).update({verified : 'Y'});
      } else {
        customerRef.child(customer['.key']).update({verified : 'N'});
      }
    },
    updateStatus: function(vehicle) {
      if(vehicle.status === 0){
        vehicleRef.child(vehicle['.key']).update({status : 1});
      } else {
        vehicleRef.child(vehicle['.key']).update({status : 0});
      }
    }


    
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 90px; 
}
input[type='text'], input[type='submit'] {
  margin-left: 15px;
  margin-right: 10px;
  margin-bottom: 15px;
}
#form{
  margin-left: 15px;
  margin-top: 10px;
}

.form-j input[type='text']{
  width: 60px;
}
.form-j input[type='submit']{
  margin-left: 0;
}

#map-end{
  margin-bottom: 30px;
}


</style>
