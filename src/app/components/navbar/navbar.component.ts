import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Client } from '../../models/Client';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private as: AuthService,
    private router: Router,
    private fs: FlashMessagesService,
    private ss: SettingsService
  ) { }

  ngOnInit() {
    this.as.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
    this.showRegister = this.ss.getSettings().allowRegistration;
  }

  onLogoutClick() {
    this.as.logout();
    this.fs.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this.router.navigate(['/login']);
  }
}
