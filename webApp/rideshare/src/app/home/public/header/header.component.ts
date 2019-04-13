import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  emailShow = true;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  // check  is authenticated
  isAuthenticated() {
    if (this.authService.isAuthenticated() === true) {
      return true;
    } else {
      return false;
    }
  }

  // get user email
  email() {
    return this.authService.getUserEmail();
  }

  // logout a user
  onLogout() {
    this.authService.logout();
  }

  // hide or show collapsed nav bar
  toggleNavbar() {
    this.collapsed = !this.collapsed;
  }

  // toggle email
  toggleEmail() {
    this.emailShow = !this.emailShow;
  }

}
