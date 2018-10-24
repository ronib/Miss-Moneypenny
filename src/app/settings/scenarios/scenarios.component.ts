import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scenarios',
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.scss']
})
export class ScenariosComponent implements OnInit {

  @Input() items: any[];
  @Input() selected: any;
  @Output() selectedChange = new EventEmitter();
  constructor() { }

  name: string;
  ngOnInit() {
  }

  addItem() {
    this.items.push({name: this.name, createdBy: "Felix", rules: []});
    this.name = '';
  }

  selectScenario(item) {
    this.selected = item;
    this.selectedChange.emit(this.selected);
  }

}
