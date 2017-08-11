import { 
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { SchoolClientModel } from '../../models/schoolAppModel';


@Component({
  selector: 'app-md-autocomplete',
  templateUrl: './md-autocomplete.component.html',
  styleUrls: ['./md-autocomplete.component.css']
})
export class MdAutocompleteComponent implements OnInit {
  schoolCtrl: FormControl;
  filteredSchool: any;

  @Input() Schools: SchoolClientModel[];
  @Output() onSelected = new EventEmitter<SchoolClientModel>();
  
  constructor() { 
    this.schoolCtrl = new FormControl();
    this.filteredSchool = this.schoolCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterSchool(name));
  }
filterSchool(val: string) {
    return val ? this.Schools.filter(s => s.name.indexOf(val) === 0)
               : this.Schools;
  }

  ngOnInit() {
  }
  ngOnDestroy(){
  }   

}
