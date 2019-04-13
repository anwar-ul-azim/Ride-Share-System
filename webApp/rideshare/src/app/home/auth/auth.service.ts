import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable() // decorator
export class AuthService {
    token: string;
    uid: string;
    email: string;
    signupSuccess = false;

    constructor(private router: Router) {}

    // make a  new user sign up
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            ).then(
                Response => {
                    this.signupSuccess = true;          // set a new signup success state true
                    this.router.navigate(['/login']);   // redirect user to login page if sign up success
                }
            );
    }

    // make a user sign in
    signinUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            ).then(
                response => {
                    this.signupSuccess = false;
                    this.router.navigate(['/']);                 // redirect user to home page
                    this.uid = firebase.auth().currentUser.uid; // set uid
                    firebase.auth().currentUser.getIdToken()
                    .then(
                        (token: string) => this.token = token   // set id token
                    );
                }
            );
    }
    // google sign in
    signInWithGoogle() {
        firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
                ).catch(error => console.log(error))
                .then(
                    response => {
                        this.signupSuccess = false;
                        this.router.navigate(['/']);                 // redirect user to home page
                        this.uid = firebase.auth().currentUser.uid; // set uid
                        firebase.auth().currentUser.getIdToken()
                            .then(
                                (token: string) => this.token = token   // set id token
                            );
                    }
                );
    }

    // get user email
    getUserEmail() {
        this.email = firebase.auth().currentUser.email;
        return this.email;
    }

    // get user id
    getUid() {
        this.uid = firebase.auth().currentUser.uid;
        return this.uid;
    }

    // get user id token
    getIdToken() {
        firebase.auth().currentUser.getIdToken()
        .then(
            (token: string) => this.token = token
        );
        return this.token;
    }

    // check if a user is Authenticated
    isAuthenticated() {
        return this.token != null;
    }

    // make a user log out
    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.uid = null;
    }

}
