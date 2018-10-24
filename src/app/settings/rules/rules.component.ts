import { Component, OnInit, Input } from '@angular/core';
import { HackatonService } from '../../services/hackaton.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  @Input() scenario: any;
  showNew: boolean = false;
  newItem: {type: string, country: string} = {type: null, country: null};
  countries: string[] = ['Israel', 'Syria', 'Russia', 'Ukraine'];
  constructor(private hackatonService: HackatonService) { }

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.hackatonService.getCountries().subscribe(countries => {
      console.log(countries);
    })
  }

  addRule() {
    this.scenario.rules.push({
      type: this.newItem.type,
      data: this.newItem.country
    })

    this.newItem = {type: null, country: null};
  }

}
