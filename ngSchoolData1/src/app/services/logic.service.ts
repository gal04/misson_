import { log } from 'util';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { ServerAccessService } from './server.access.service';
import { State } from '../models/state.model';
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
import { SchoolServerModel } from '../server/schoolModel';
import { SchoolClientModel,GregToHebModel } from '../models/schoolAppModel';
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
import { StudentServerModel } from '../server/StudentModel';
import { StudentClientModel } from '../models/studentAppModel';



@Injectable()
export class LogicService {
    private state: State;
    private schoolsSub:        BehaviorSubject<SchoolClientModel[]>;
    private selectedSchoolSub: BehaviorSubject<SchoolClientModel>;
    private studentsSub:       BehaviorSubject<StudentClientModel[]>;

    constructor(private serverAccessService: ServerAccessService) {
        this.initState();
        this.initSubjects();        
        this.getSchools();
    }
    private initState() {
        this.state = new State();
        this.state.Schools = [];
        this.state.Students = [];
    }
    private initSubjects() {
        this.selectedSchoolSub = new BehaviorSubject<SchoolClientModel>(null);
        this.schoolsSub = new BehaviorSubject<SchoolClientModel[]>(this.copyOfSchools());
        this.studentsSub = new BehaviorSubject<StudentClientModel[]>(this.copyOfStudents());

    }
    private getSchools() {
        console.log("in getSchools$");
        //let fromServer = 
        this.serverAccessService.getSchools().subscribe(schoolsFromServer=>{            
                this.state.Schools = this.convertSchoolFromServer(schoolsFromServer);
                this.schoolsSub.next(this.copyOfSchools());
        });        
    }
    private getStudents(semel,year){
         console.log("in getStudents$");
         this.serverAccessService.getStudets(semel,year).subscribe(studentsFromServer=>{ 
            this.state.Schools.map(schoolIndex=>{
            if (schoolIndex.isSelected) {
                this.state.Students = this.convertStudentsFromServer(studentsFromServer);
                //schoolIndex.students = resStudents;
                this.studentsSub.next(this.copyOfStudents());
                //insert studets to school
                }

            });                       
        });  

    }
    private convertStudentsFromServer(fromServer: StudentServerModel[]): StudentClientModel[] {
        let students: StudentClientModel[] = [];
        fromServer.map(itemfromserver => {                
                students.push({                    
                    studentId: itemfromserver.studentId,
                    classCode: itemfromserver.classCode,
                    classNum : itemfromserver.classNum,
                    firstName: itemfromserver.fullName.split(' ')[1],
                    lastName : itemfromserver.fullName.split(' ')[0],
                    isSelected: false      
            })         
        });
        return students;
    }
    public getStudentsFromSchoolByYear(year){
        console.log("getStudentsFromSchoolByYear =" + year);
        this.state.Schools.map(schoolIndex=>{
            if (schoolIndex.isSelected) {
                this.getStudents(schoolIndex.semel,year);//update the students to show in state
                //maybe return
                //insert studets to school
                //check if schoolIndex students array is empty .... if so call get
                //else set list withwhat we have ....
            }
        });

    }
    //#############################################################
    public get students$(): Observable<StudentClientModel[]> {
        return this.studentsSub.asObservable();
    }
    public get selectedschool$(): Observable<SchoolClientModel> {
        return this.selectedSchoolSub.asObservable();
    }
    public get schools$(): Observable<SchoolClientModel[]> {
        return this.schoolsSub.asObservable();
    }
    //#############################################################
    public selectSchool(school) {
        this.state.Schools.map(schoolIndex => {            
            let isSelected = (school.semel == schoolIndex.semel);            
            school.isSelected = isSelected;
            schoolIndex.isSelected = isSelected;
            if (isSelected) {
                //to do ... map over all state to set isselected = false to all(if only one can be selected...)            
                this.selectedSchoolSub.next(this.copyOfSchool(schoolIndex));
            }            
            
        });
    }
    

    private convertSchoolFromServer(fromServer: SchoolServerModel[]): SchoolClientModel[] {
        let schools: SchoolClientModel[] = [];
        fromServer.map(itemfromserver => {                       
                schools.push({
                    semel: itemfromserver.semel,
                    name: itemfromserver.name,
                    years: itemfromserver.years,
                    years2: this.setAllHebYears(itemfromserver.years),
                    yearSelected:undefined,
                    isSelected: false,
                    students: Array<StudentClientModel>()         
            })         
        });
        return schools;
    }
    private setAllHebYears(arr:number[]):GregToHebModel[]{
        let compo:GregToHebModel[]= [];
        arr.map(y=>{
            compo.push({
                    yearGregorian:y,
                    yearHebrow:this.getHebrowYear(y)
                }
            )
        });
        return compo;
    }
    getHebrowYear(num):string{
        ////this.serverAccessService.getHebrowDateUrl()
        //need to call server 
        switch (num) {
            case 2007:
                return "תשס\"ח";
            case 2008:
                return "תשס\"ט";
            case 2009:
                return "תש\"ע";
            case 2010:
                return "תשע\"א";
            case 2011:
                return "תשע\"ב";
            case 2012:
                return "תשע\"ג";                
            case 2013:
                return "תשע\"ד";
            case 2014:
                return "תשע\"ה";
            case 2015:
                return "תשע\"ו";
            case 2016:
                return "תשע\"ז";
            case 2017:
                return "תשע\"ח";
            case 2018:
                return "תשע\"ט";
            case 2019:
                return "תש\"פ";
            default:
                return "rrrrr";                
        }
    }
    private refreshDetails() {
        let selectedschool: SchoolClientModel = this.state.Schools.find(school => {
            return school.isSelected;
        });
        this.selectedSchoolSub.next(this.copyOfSchool(selectedschool));
    }
//##############################################################
//##############################################################
    private copyOfSchools() {
        let copyOfSchooles: SchoolClientModel[] = this.state.Schools.map(school => {
            return this.copyOfSchool(school);
        });
        return copyOfSchooles;
    }

    private copyOfSchool(school): SchoolClientModel {
        return Object.assign({}, school);
    }
//##############################################################
    private copyOfStudents() {
        let copyOfStudents: StudentClientModel[] = this.state.Students.map(student => {
            return this.copyOfStudent(student);
        });
        return copyOfStudents;
    }

    private copyOfStudent(student): StudentClientModel {
        return Object.assign({}, student);
    }
}