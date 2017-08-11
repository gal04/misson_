import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MdButtonModule,
         MdCheckboxModule,
         MdAutocompleteModule,
         MdInputModule,
         MdSelectModule,
         MdSortModule,
         MdTableModule}            from '@angular/material';
import { CdkTableModule}           from '@angular/cdk';
import { LogicService}             from './services/logic.service';
import { ServerAccessService }     from './services/server.access.service';
import { HttpClientModule}         from '@angular/common/http';
import { AppComponent }            from './app.component';
import { MdAutocompleteComponent } from './components/md-autocomplete/md-autocomplete.component';
import { MdSelectComponent }       from './components/md-select/md-select.component';
import { MdTableComponent }        from './components/md-table/md-table.component';
import { NgTableComponent }        from './components/ng-table/ng-table.component';
import { SmratComponentComponent } from './components/smrat-component/smrat-component.component';
import { NgxDatatableModule }      from '@swimlane/ngx-datatable';
import {DataTableModule,SharedModule} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    MdAutocompleteComponent,
    MdSelectComponent,
    MdTableComponent,
    NgTableComponent,
    SmratComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MdAutocompleteModule,
    MdInputModule,
    MdSelectModule,
    MdSortModule,
    MdTableModule,
    CdkTableModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    DataTableModule,SharedModule
    
  ],
  providers: [
    LogicService,
    ServerAccessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
