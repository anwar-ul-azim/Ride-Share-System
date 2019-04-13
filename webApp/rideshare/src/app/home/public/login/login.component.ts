import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  // is signup success
  signupSuccess() {
    if (this.authService.signupSuccess === true) {
      return true;
    } else {
      return false;
    }
  }

  // get user data from login form and pass to AuthService
  onSignin(form: NgForm) {
    //  get user data from login form
    const email = form.value.email;
    const password = form.value.password;

    // pass data to authService
    this.authService.signinUser(email, password);
  }

  // google sign in
  googleSignin() {
    this.authService.signInWithGoogle();
  }

}
