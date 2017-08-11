import { Component, OnInit,OnDestroy } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

import { LogicService } from '../../services/logic.service';
import { SchoolClientModel } from '../../models/schoolAppModel';
//import { SchoolServerModel } from '../../server/schoolModel';
import { StudentClientModel} from '../../models/studentAppModel';
@Component({
  selector: 'app-smrat-component',
  templateUrl: './smrat-component.component.html',
  styleUrls: ['./smrat-component.component.css']
})
export class SmratComponentComponent implements OnInit {
    private schoolsInSmartComp: SchoolClientModel[];
    private schoolsSub:Subscription;
    //------------------------------------------
    private selectedSchool: SchoolClientModel;
    private selectedSchoolSub:Subscription;
    //------------------------------------------
    private studentsInSmartComp: StudentClientModel[]
    private studentsSub:Subscription;

    private selectedY:boolean;

  constructor(private logicService: LogicService) { }
  ngOnInit() {
        this.schoolsSub = this.logicService.schools$.subscribe(schools => {
            this.schoolsInSmartComp = schools;
        });

        this.selectedSchoolSub = this.logicService.selectedschool$.subscribe(school => {
            this.selectedSchool = school;
        });

        this.studentsSub = this.logicService.students$.subscribe(students=>{
            this.studentsInSmartComp = students;
        });
        this.selectedY = false;

  }
  ngOnDestroy() {
     this.schoolsSub.unsubscribe();
     this.selectedSchoolSub.unsubscribe();
     this.studentsSub.unsubscribe();
  }
  private onSelectedInSmartComp(School) {
        this.logicService.selectSchool(School);
    }   
    private onSelectedYearInSmartComp(year) {
        console.log("onSelectedYearInSmartComp -year " + year);        
        this.logicService.getStudentsFromSchoolByYear(year);
        this.selectedY = true;
    }  
}
