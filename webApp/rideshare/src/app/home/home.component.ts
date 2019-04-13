import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected = true;
  lat = 23.8145486;
  lng = 90.5250651;
  // auth service added
  constructor(private authService: AuthService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    } else {
      alert(
        'The Geolocation service failed.' + ' or ' +
        'Your browser doesn\'t support geolocation.');
    }
  }
  // check  is authenticated
  isAuthenticated() {
    if (this.authService.isAuthenticated() === true) {
      return true;
    } else {
      return false;
    }
  }

  // control in showing login and signup button on click get started button
  onStarted() {
    this.selected = false;
  }

}
