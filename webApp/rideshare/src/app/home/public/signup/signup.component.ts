import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  // get user data from signup form and pass to AuthService
  onSignup(form: NgForm) {
    // get data from sign up form
    const email = form.value.email;
    const password = form.value.password;

    // pass signup data
    this.authService.signupUser(email, password);
  }

  // google sign in
  googleSignin() {
    this.authService.signInWithGoogle();
  }

}
