import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // firebase credentials for the project
    firebase.initializeApp({
      apiKey: 'AIzaSyDjUpLecklFpo7tBxBIoJPyG4x6eNPDqqc',
      authDomain: 'dbproject-49b7b.firebaseapp.com',
      databaseURL: 'https://dbproject-49b7b.firebaseio.com',
      projectId: 'dbproject-49b7b',
      storageBucket: 'dbproject-49b7b.appspot.com',
      messagingSenderId: '502312517242'
    });
  }
}
