import { Component, OnInit, Input } from '@angular/core';
import { HackatonService } from '../../services/hackaton.service';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

  @Input() scenario: any;
  showNew: boolean = true;
  newItem: { type: string, value: string, additionalValue: number } = { type: null, value: '', additionalValue: 0 };
  countries: string[] = [];
  imageCategories: string[] = [];
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
      console.log(data);
    })
  }

  loadHostilImages() {
    this.hackatonService.getHostilImages().subscribe((data: any[]) => {
      console.log(data);
    })
  }

  loadHostilWatchlists() {
    this.hackatonService.getHostilWatchlists().subscribe((data: any[]) => {
      console.log(data);
    })
  }

  loadHostilContacts() {
    this.hackatonService.getHostilContacts().subscribe((data: any[]) => {
      console.log(data);
    })
  }

  addRule() {
    switch (this.newItem.type) {
      case 'Location':
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
      percentage: this.newItem.additionalValue
    }).subscribe(() => {
      this.newItem.value = '';
      this.newItem.additionalValue = 0;
      this.loadHostilCountries();
    })
  }

  saveImageCategories() {
    this.hackatonService.createHostilImages({
      category: this.newItem.value
    }).subscribe(() => {
      this.newItem.value = '';
      this.loadHostilImages();
    })
  }

  saveWatchlists() {
    this.hackatonService.createHostilWatchlists({
      value: this.newItem.value
    }).subscribe(() => {
      this.newItem.value = '';
      this.loadHostilWatchlists();
    })
  }

  saveContacts() {
    this.hackatonService.createHostilContacts({
      value: this.newItem.value
    }).subscribe(() => {
      this.newItem.value = '';
      this.loadHostilContacts();
    })
  }

}
