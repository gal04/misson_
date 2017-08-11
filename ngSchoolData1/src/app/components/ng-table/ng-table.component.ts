import { 
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter } from '@angular/core';
import {DataSource} from '@angular/cdk';
import {MdSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { StudentClientModel,iStudent } from '../../models/studentAppModel';
@Component({
  selector: 'table-ng-component',
  styleUrls: ['ng-table.component.css'],
  templateUrl: 'ng-table.component.html',
})
export class NgTableComponent {
  displayedColumns = ['studentId','firstName','lastName','classCode', 'classNum'];
  @Input() Students: StudentClientModel[];
  @Input() selectedYear: number;

  @ViewChild(MdSort) sort: MdSort;
  

  ngOnInit() {
  }
}