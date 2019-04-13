import { Component, OnInit, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ServerService } from '../../http/server.service';
import * as firebase from 'firebase';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader, InfoWindowManager } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
// initial lat,lng
  lat = 23.8145486;
  lng = 90.5250651;

  city = 'my position';
  // clicked position massage
  message = '';
  // clicked position massage show or not
  showMessage = false;
  // diraction  array take origin and destination lat,lng
  dir;
  // contain online driver
  online = {};
  originCoord = [];
  destinationCoord = [];
  valid = false;
  // show direction
  show = true;
  // set gps data from ServerService
  gpsData = this.serverService.gpsData;
// gps marker array
  gps: marker[] = [{
    lat: 0,
    lng: 0,
    name: '',
    phone: '',
    city: '',
    vehicle: ''
  }];
// marker position on click or search array
  myPos = {
    lat: 0,
    lng: 0,
    win: 'clicked position'
  };

// variable to control search and direction form
  public searchControl: FormControl;
  public originControl: FormControl;
  public destinationControl: FormControl;
// see input data on direction and search form
  @ViewChild('search')
  public searchElementRef: ElementRef;
  @ViewChild('origin')
  public originElementRef: ElementRef;
  @ViewChild('destination')
  public destinationElementRef: ElementRef;

// map style array night,retro,default
  styleType = {
    night: [{ elementType: 'geometry', stylers: [{ color: '#242f3e' }] }, {
      elementType: 'labels.text.stroke', stylers: [{
        color:
          '#242f3e'
      }]
    }, { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] }, {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }]
    }, {
      featureType: 'poi', elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    }, { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] }, {
      featureType:
        'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }]
    }, {
      featureType: 'road', elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    }, { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] }, {
      featureType: 'road.highway', elementType:
        'geometry', stylers: [{ color: '#746855' }]
    }, {
      featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{
        color:
          '#1f2835'
      }]
    }, { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] }, {
      featureType:
        'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }]
    }, {
      featureType: 'transit.station', elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    }, { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] }, {
      featureType:
        'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }]
    }, {
      featureType: 'water', elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }],
    retro: [{ elementType: 'geometry', stylers: [{ color: '#ebe3cd' }] }, {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#523735' }]
    }, { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f1e6' }] }, {
      featureType: 'administrative',
      elementType: 'geometry.stroke', stylers: [{ color: '#c9b2a6' }]
    }, {
      featureType: 'administrative.land_parcel', elementType:
        'geometry.stroke', stylers: [{ color: '#dcd2be' }]
    }, {
      featureType: 'administrative.land_parcel', elementType: 'labels.text.fill',
      stylers: [{ color: '#ae9e90' }]
    }, {
      featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }]
    }, { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] }, {
      featureType: 'poi', elementType: 'labels.text.fill',
      stylers: [{ color: '#93817c' }]
    }, { featureType: 'poi.park', elementType: 'geometry.fill', stylers: [{ color: '#a5b076' }] },
    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#447530' }] }, {
      featureType: 'road', elementType:
        'geometry', stylers: [{ color: '#f5f1e6' }]
    }, {
      featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#fdfcf8' }]
    }, { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#f8c967' }] }, {
      featureType: 'road.highway',
      elementType: 'geometry.stroke', stylers: [{ color: '#e9bc62' }]
    }, {
      featureType: 'road.highway.controlled_access', elementType:
        'geometry', stylers: [{ color: '#e98d58' }]
    }, {
      featureType: 'road.highway.controlled_access', elementType: 'geometry.stroke',
      stylers: [{ color: '#db8555' }]
    }, {
      featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#806b63' }]
    }, { featureType: 'transit.line', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }] }, {
      featureType: 'transit.line',
      elementType: 'labels.text.fill', stylers: [{ color: '#8f7d77' }]
    }, {
      featureType: 'transit.line', elementType: 'labels.text.stroke',
      stylers: [{ color: '#ebe3cd' }]
    }, {
      featureType: 'transit.station', elementType: 'geometry', stylers: [{ color: '#dfd2ae' }]
    }, { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#b9d3c2' }] }, {
      featureType: 'water', elementType:
        'labels.text.fill', stylers: [{ color: '#92998d' }]
    }]
  };
// set initial style to night
  style = this.styleType.night;
// constructor set service or class object
  constructor(private serverService: ServerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
  }
// ng method run on initialization
  ngOnInit() {
    // firebase connection to see current online driver in realtime
    firebase.database().ref('online/').on('value', snap => {
      if (snap.val() != null) {
        // set online array
        this.online = snap.val();
        this.gps = [];
        // set gps array
        for (const key of Object.keys(snap.val())) {
          this.gps.push({
            lat: parseFloat(this.online[key].location.gps.split(',')[0]),
            lng: parseFloat(this.online[key].location.gps.split(',')[1]),
            name: this.online[key].name,
            phone: this.online[key].phone,
            city: this.online[key].location.city,
            vehicle: this.online[key].vehicle
          });
        }
      }
    });
    // create search FormControl
    this.searchControl = new FormControl();
    this.originControl = new FormControl();
    this.destinationControl = new FormControl();

    // set current position using html5 geolocation
    this.setCurrentPosition();
// place autocomplete on search
    this.placeAutocomplete(this.searchElementRef, 1);
    this.placeAutocomplete(this.originElementRef, 2);
    this.placeAutocomplete(this.destinationElementRef, 3);
  }
// set dir array that contain a to b direction
  getDirection() {
    if (this.originCoord.length === 2 && this.destinationCoord.length === 2) {
      this.dir = {
        origin: { lat: this.originCoord[0], lng: this.originCoord[1], },
        destination: { lat: this.destinationCoord[0], lng: this.destinationCoord[1] }
      };
    }
  }
// close show direction off
  directionOff() {
    this.show = false;
  }
// place search auto complete
  placeAutocomplete(searchElementRef, num) {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // set latitude, longitude
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          // set city marker InfoWindow
          this.city = 'search position: ' + searchElementRef.nativeElement.value;
          // set search result
          if (num === 1) {
            this.serverService.gpsData.city = searchElementRef.nativeElement.value;
            this.serverService.gpsData.lat = place.geometry.location.lat();
            this.serverService.gpsData.lng = place.geometry.location.lng();
          }
          // set origin Coordinates
          if (num === 2) {
            this.originCoord = [place.geometry.location.lat(), place.geometry.location.lng()];
          }
          // set destination Coordinates
          if (num === 3) {
            this.destinationCoord = [place.geometry.location.lat(), place.geometry.location.lng()];
          }
          // check if origin and destination are both exist
          if (this.originCoord.length === 2 && this.destinationCoord.length === 2) {
            this.valid = true;
          }
        });
      });
    });
  }
// show lat,lng on clicked position on map
  onClick(event) {
    this.showMessage = true;
    // create massage
    this.message = 'You Clicked at:  ' + 'latitude: ' + event.coords.lat + ', longitude: ' + event.coords.lng;
    // set serverService lat,lng
    this.serverService.gpsData.lat = event.coords.lat ;
    this.serverService.gpsData.lng = event.coords.lng;
    // set marker Position
    this.myPos.lat = this.serverService.gpsData.lat;
    this.myPos.lng = this.serverService.gpsData.lng;
  }
// unused function
  // onGet() {
  //   this.serverService.getOnlineFromServer().subscribe(
  //     (getData: any) => {
  //       if (getData != null) {
  //         this.online = getData;
  //         for (const key of Object.keys(getData)) {
  //           this.gps.push({
  //             lat: parseFloat( this.online[key].location.gps.split(',')[0] ),
  //             lng: parseFloat( this.online[key].location.gps.split(',')[1] ),
  //             name: this.online[key].name,
  //             phone: this.online[key].phone,
  //             city: this.online[key].location.city,
  //             vehicle: this.online[key].vehicle
  //           });
  //         }
  //       }
  //     },
  //     (error) => console.log(error)
  //   );
  // }
// change map style-night,retro,default
  changeStyles(style) {
    if (style === 0) {
      this.style = null;
    }
    if (style === 1) {
      this.style = this.styleType.night;
    }
    if (style === 2) {
      this.style = this.styleType.retro;
    }
  }
// html5 geolocation, set- lat,lng
  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }
}
// interface for type safety.
// tslint:disable-next-line:class-name
interface marker {
  lat: number;
  lng: number;
  name: string;
  phone: string;
  city: string;
  vehicle: string;
}
