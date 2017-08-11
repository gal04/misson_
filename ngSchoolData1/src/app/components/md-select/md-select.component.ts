import { 
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter } from '@angular/core';
import { SchoolClientModel,GregToHebModel } from '../../models/schoolAppModel';
@Component({
  selector: 'app-md-select',
  templateUrl: './md-select.component.html',
  styleUrls: ['./md-select.component.css']
})
export class MdSelectComponent implements OnInit {
    @Input() selectedSchool: SchoolClientModel;
    @Output() onSelecteYear = new EventEmitter<number>();
    //sending out the year
  constructor() { }

  ngOnInit() {
  }

  SelecteYear(event , item: GregToHebModel) {
  //bug in md-select with onSelectionChange fire all items
    if (event.source.selected) 
        {
            //console.log("onSelectedYearInSmartComp -year " + year);
            console.log("num selected = " + item.yearGregorian);
            this.onSelecteYear.emit(item.yearGregorian);
        }
    else
        {
            console.log("num is not selected = " + item.yearGregorian);
        }
    }
}
