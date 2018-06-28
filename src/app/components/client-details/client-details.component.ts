import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private cs: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private fs: FlashMessagesService
  ) { }

  ngOnInit() {
    //Get id from route
    this.id = this.route.snapshot.params['id'];
    //Get client
    this.cs.getClient(this.id).subscribe(
      client => {
        if (client != null) {
          if (client.balance > 0) {
            this.hasBalance = true;
          } else {
            this.hasBalance = false;
          }
        }

        this.client = client;
      }
    );
  }

  displayPhoneFormat(phone: string):string {
    return `${phone.substring(0,3)}-${phone.substring(3,6)}-${phone.substring(6)}`;
  }

  updateBalance() {
    this.cs.updateClient(this.client);
    this.fs.show('Balance updated', {
      cssClass: 'alert-success',
      timeout: 4000
    });
  }

  onDeleteClick() {
    if (confirm('Are you sure?')) {
      //delete client
      this.cs.deleteClient(this.client);
      //show success message
      this.fs.show('Client successfully deleted', {
        cssClass: 'alert-success',
        timeout: 3000
      });
      //navigate to dashboard
      this.router.navigate(['/']);
    }
  }

}
