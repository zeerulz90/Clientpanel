import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from '../../models/Client';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0  
  }

  disableBalanceOnAdd: boolean;
  @ViewChild('clientForm') form: any;

  constructor(
    private fs: FlashMessagesService,
    private cs: ClientService,
    private router: Router,
    private ss: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.ss.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid} : {value: Client, valid: boolean}) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      //Show error flash message
      this.fs.show('Please fill in the form correctly.', {
        cssClass : 'alert-danger',
        timeout: 3000
      });
    } else {
      //Add client to existing collection
      this.cs.addClient(value);
      //Show success flash message
      this.fs.show('Client has been successfully added.', {
        cssClass : 'alert-success',
        timeout: 3000
      });
      //Redirect to dashboard
      this.router.navigate(['/']);
    }
  }

}
