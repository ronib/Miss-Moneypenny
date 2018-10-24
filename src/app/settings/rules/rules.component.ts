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
  newItem: { type: string, value: string } = { type: '', value: '' };
  countries: string[] = [];
  imageCategories: string[] = [];

  rulesCountries: any[] = [];
  rulesImages: any[] = [];
  rulesWatchlists: any[] = [];
  rulesContacts: any[] = [];
  constructor(private hackatonService: HackatonService) { }

  ngOnInit() {
    //Load all possible values
    this.loadCountries();
    this.loadImageCategories();

    //Load saved for scenario values
    this.loadHostilCountries();
    this.loadHostilImages();
    this.loadHostilWatchlists();
    this.loadHostilContacts();
  }

  loadCountries() {
    this.hackatonService.getCountries().subscribe((countries: string[]) => {
      this.countries = countries;
    })
  }

  loadImageCategories() {
    this.hackatonService.getImageCategories().subscribe((imageCategories: string[]) => {
      this.imageCategories = imageCategories;
    })
  }

  loadHostilCountries() {
    this.hackatonService.getHostilCountries().subscribe((data: any[]) => {
      this.rulesCountries = data;
    })
  }

  loadHostilImages() {
    this.hackatonService.getHostilImages().subscribe((data: any[]) => {
      this.rulesImages = data;
    })
  }

  loadHostilWatchlists() {
    this.hackatonService.getHostilWatchlists().subscribe((data: any[]) => {
      this.rulesWatchlists = data;
    })
  }

  loadHostilContacts() {
    this.hackatonService.getHostilContacts().subscribe((data: any[]) => {
      this.rulesContacts = data;
    })
  }

  addRule() {
    switch (this.newItem.type) {
      case 'Locations':
        this.saveCountries();
        break;
      case 'Images':
        this.saveImageCategories();
        break;
      case 'Watchlists':
        this.saveWatchlists();
        break;
      case 'Contacts':
        this.saveContacts();
        break;
      default:
        break;
    }
  }

  saveCountries() {
    this.hackatonService.createHostilCountries({
      name: this.newItem.value,
      percentage: 100
    }).subscribe(() => {
      this.clearValue();
      this.loadHostilCountries();
    })
  }

  saveImageCategories() {
    this.hackatonService.createHostilImages({
      category: this.newItem.value
    }).subscribe(() => {
      this.clearValue();
      this.loadHostilImages();
    })
  }

  saveWatchlists() {
    this.hackatonService.createHostilWatchlists({
      value: this.newItem.value
    }).subscribe(() => {
      this.clearValue();
      this.loadHostilWatchlists();
    })
  }

  saveContacts() {
    this.hackatonService.createHostilContacts({
      value: this.newItem.value
    }).subscribe(() => {
      this.clearValue();
      this.loadHostilContacts();
    })
  }

  changeType() {
    this.clearValue();
  }

  clearValue() {
    this.newItem.value = ''
  }

}
