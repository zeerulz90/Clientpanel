import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(
    private fs: FlashMessagesService,
    private ss: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.ss.getSettings();
  }

  onSubmit() {
    this.ss.changeSettings(this.settings);
    this.fs.show('Settings saved', {
      cssClass: 'alert-success',
      timeout: 3000
    });
  }

}
