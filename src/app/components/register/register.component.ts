import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private as: AuthService,
    private fs: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.as.register(this.email, this.password)
      .then(res => {
        this.fs.show('Registration successful and logged in!', {
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['/']);
      }).catch(
        err => {
          this.fs.show(err.message, {
            cssClass: 'alert-danger',
            timeout: 3000
          });
        }
      );
  }

}
