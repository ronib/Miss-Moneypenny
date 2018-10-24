import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  scenarios: any[] = [{name: 'Terror', createdBy: 'Felix', rules: []}];
  selectedScenario: any;
  constructor() {
    this.selectedScenario = this.scenarios[0];
  }

  ngOnInit() {

  }

}
