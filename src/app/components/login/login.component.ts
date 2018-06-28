import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private as: AuthService,
    private fs: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.as.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.as.login(this.email, this.password).then(
      res => {
        this.fs.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['/']);
      }
    ).catch(
      err => {
        this.fs.show(err.message, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
      }
    );
  }

}
