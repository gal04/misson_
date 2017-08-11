
export class StudentClientModel {

    public studentId  : number;
    public firstName  : string;
    public lastName   : string;    
    public isSelected : boolean;        
    public classCode  : string;
    public classNum   : number;
}
export interface iStudent {
    studentId;
    firstName;
    lastName;
    classCode;
    classNum;
    
}