import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import {HttpClient} from '@angular/common/http';
//import { MockServer } from '../server/schoolServerMock';
import { SchoolServerModel } from '../server/schoolModel';
import { StudentServerModel } from '../server/studentModel';

@Injectable()
export class ServerAccessService {
    //private server: MockServer;    
    getSchoolsUrl = 'https://web.mashov.info/test/schools.json';

    getSchoolStudets =  'https://web.mashov.info/test/';
    //SEMEL/YEAR';
    stdEnding= '/students.json';

    getHebrowDateUrl='http://www.hebcal.com/converter/?cfg=json&gy=2013&gm=9&gd=2&g2h=1';

    constructor(private http: HttpClient) {
        //this.server = new MockServer();
    }

    public getSchools(): Observable<SchoolServerModel[]> {        
            return this.http.get<SchoolServerModel[]>(this.getSchoolsUrl);            
        }

    public getStudets(semel:number,year:number): Observable<StudentServerModel[]> {        
            return this.http.get<StudentServerModel[]>(this.getSchoolStudets+semel+"/"+year+this.stdEnding);            
        }

        /**to do
         * public get hebrow date from server
         */
    
        
    }
       









