import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }

  disableBalanceOnEdit: boolean;

  constructor(
    private cs: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private fs: FlashMessagesService,
    private ss: SettingsService
  ) { }

  ngOnInit() {
    //Assign boolean
    this.disableBalanceOnEdit = this.ss.getSettings().disableBalanceOnEdit;
    //Get id from route
    this.id = this.route.snapshot.params['id'];
    //Get client
    this.cs.getClient(this.id).subscribe(
      client => {
        this.client = client;
      }
    );
  }

  onSubmit({value, valid} : {value: Client, valid: boolean}) {
    if (!valid) {
      //show error message
      this.fs.show('Please fill in the form correctly', {
        cssClass: 'alert-danger',
        timeout: 3000
      });
    } else {
      //Add id to client object
      value.id = this.id;
      //edit client
      this.cs.updateClient(value);
      //show success message
      this.fs.show('Client updated', {
        cssClass: 'alert-success',
        timeout: 3000
      });
      //navigate back to client details
      this.router.navigate([`/client/${this.id}`]);
    }
  }

}
