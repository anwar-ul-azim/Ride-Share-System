import { Component, OnInit } from '@angular/core';
import { ServerService } from '../../http/server.service';
import { NgForm } from '@angular/forms';
// decorator
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // show alert or not
  message = false;
  // set time
  time = new Date() ;
// get gps data from ServerService
  gpsData = this.serverService.gpsData;
// online array
  online = {
    name: '',
    type: '',
    phone: '',
    vehicle: '',
    location: {
      city: '',
      gps: ''
    },
    time: '',
  };
// user data array
  data = {
    status: '',
    location: {
      city: '',
      gps: ''
    },
    time: '',
    location_story: [{ time: '', location: '' }],
    profile: {
      name: '',
      email: '',
      type: '',
      vehicle: '',
      birth_date: '',
      image: '',
      nid: '',
      did: '',
      vno: '',
      phone: '',
      gender: '',
      language: '',
      education: '',
      home: '',
      address: '',
    }
  };

  constructor(private serverService: ServerService ) {
    // update time
    setInterval(() => {
      this.time = new Date();
    }, 1);
  }
// class method lifecycle hooks, called on initialization
  ngOnInit() {
    this.onGet();
  }
// html5 geolocation
  getGps() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.gpsData.lat = position.coords.latitude;
        this.gpsData.lng = position.coords.longitude;
      });
    } else {
      alert(
        'The Geolocation service failed.' + ' or ' +
        'Your browser doesn\'t support geolocation.');
    }
  }
// update user data on db
  onUpdate() {
    this.serverService.storeInServer(this.data).subscribe(  // subscribe observer
      (response) => console.log('done'),
      (error) => console.log(error)
    );
  }
// get user data from db
  onGet() {
    this.serverService.getFromServer().subscribe(
      (getData: any) => {
        if (getData != null) {
          this.data = getData;                    // set data and gpsdata array
          this.gpsData.lat = parseFloat( this.data.location.gps.split(',')[0]);
          this.gpsData.lng = parseFloat( this.data.location.gps.split(',')[1]);
          this.gpsData.city = this.data.location.city;
        }
        if (getData === null) {
          this.message = true;
          this.onUpdate();
        }
        if (getData.profile.name === '') {
          this.message = true;
        }
      },
      (error) => console.log(error)
    );
  }
  // update online user
  getOnline() {
    this.online.name = this.data.profile.name;           // set online array
    this.online.type = this.data.profile.type;
    this.online.phone = this.data.profile.phone;
    this.online.vehicle = this.data.profile.vehicle;
    this.online.location.city = this.data.location.city;
    this.online.location.gps = this.data.location.gps;
    this.online.time = this.data.time;
    // add online user on db
    this.serverService.storeOnlineInServer(this.online).subscribe(
      (response) => console.log('done'),
      (error) => console.log(error)
    );
  }
// make user online
  onStateChange(form: NgForm) {
    this.data.status = 'online';                          // set data array
    this.data.time = this.time.getTime().toString();
    this.data.location.city = form.value.city;            // get data from form
    this.data.location.gps = form.value.lat + ',' + form.value.lng;
    this.serverService.gpsData.lat = form.value.lat;
    this.serverService.gpsData.lng = form.value.lng;

    this.getOnline();
// update user data on db
    this.serverService.storeInServer(this.data).subscribe(
      (response) => console.log('done'),
      (error) => console.log(error)
    );
  }
// make user offline
  goOffline() {
    this.data.status = 'offline';
    this.serverService.storeInServer(this.data).subscribe(     // update user status
      (response) => console.log('done'),
      (error) => console.log(error)
    );
    this.serverService.deleteOnlineInServer().subscribe(     // delete offline user from db
      (response) => console.log('done'),
      (error) => console.log(error)
    );
  }
}
