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
import { StudentClientModel } from '../../models/studentAppModel';

@Component({
  selector: 'table-md-component',
  styleUrls: ['md-table.component.css'],
  templateUrl: 'md-table.component.html',
})
export class MdTableComponent {
  displayedColumns = ['studentId','firstName','lastName','classCode', 'classNum'];
  @Input() Students: StudentClientModel[];
  @ViewChild(MdSort) sort: MdSort;

  ngOnInit() {
  }
}
