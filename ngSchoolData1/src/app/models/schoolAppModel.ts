import { StudentClientModel } from './studentAppModel';
export class SchoolClientModel {
    ///public Id: number;
    public semel: number;
    public name: string;
    public years: Array<number>;
    public years2: Array<GregToHebModel>;
    public yearSelected:number;
    public isSelected: boolean;
    public students :Array<StudentClientModel>;
}
export class GregToHebModel {
    public yearHebrow: string;
    public yearGregorian: number;
    
}