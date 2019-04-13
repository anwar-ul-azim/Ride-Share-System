import { Component, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';
import { ServerService } from '../../http/server.service';
import { NgForm } from '@angular/forms';
// decorator
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private serverService: ServerService) { }
// user data array
  data = {
    status: '',
    location: {
      city: '',
      gps: ''},
    time: '',
    location_story: [{time: '', location: ''}],
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
// profile edit
  selected = true;
  // selectable datatype
  genders = ['Male', 'Female'];
  types = ['Driver', 'Passenger'];
  vehicles = ['Cng', 'Car', 'Taxi', 'Motorcycle'];
  defaultImage = 'https://preview.ibb.co/mkuvRc/profile.jpg';
// class method lifecycle hooks, called on initialization
  ngOnInit() {
    this.onGet();
  }
// edit profile on
  onStarted() {
    this.selected = false;
  }
// edit profile cancle
  onCancle() {
    this.selected = true;
  }
// update profile
  onUpdate(form: NgForm) {
    this.data.profile.name = form.value.name;            // get data from form and set user data array
    this.data.profile.email = form.value.email;
    this.data.profile.type = form.value.type;
    this.data.profile.vehicle = form.value.vehicle;
    this.data.profile.birth_date = form.value.birth_date;
    this.data.profile.image = form.value.image;
    this.data.profile.nid = form.value.nid;
    this.data.profile.did = form.value.did;
    this.data.profile.vno = form.value.vno;
    this.data.profile.phone = form.value.phone;
    this.data.profile.gender = form.value.gender;
    this.data.profile.language = form.value.language;
    this.data.profile.education = form.value.education;
    this.data.profile.home = form.value.home;
    this.data.profile.address = form.value.address;
// update data array on db
    this.serverService.storeInServer(this.data).subscribe(
      (response) => this.selected = true,
      (error) => console.log(error)
    );
  }
// get data from db
  onGet() {
    this.serverService.getFromServer().subscribe(
      (getData: any) => {
        if (getData != null) {
        this.data = getData;
        }
        if (getData === null) {
          this.selected = false;
        }
        if (getData.profile.name === '') {
          this.selected = false;
        }
      },
      (error) => console.log(error)
    );
  }

}
