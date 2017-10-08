import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';

// Kendo Ui Modules
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ChartModule } from '@progress/kendo-angular-charts';

// Third Party Modules
import {DndModule} from 'ng2-dnd'
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {ToastOptions} from 'ng2-toastr';
import {MomentModule} from 'angular2-moment';
import {CalendarComponent} from "angular2-fullcalendar/src/calendar/calendar";

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyContentsComponent } from './body-contents/body-contents.component';
import { PeoplesComponent } from './body-contents/peoples/peoples.component';
import { AddTaskComponent } from './body-contents/add-task/add-task.component';
import { BoardComponent } from './body-contents/board/board.component';
import { ReportsComponent } from './reports/reports.component';
import { TopContributionComponent } from './reports/top-contribution/top-contribution.component';
import { MainbodyContentsComponent } from './reports/mainbody-contents/mainbody-contents.component';
import { CalendarTaskComponent } from './calendar/calendar.component';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockData }  from './shared/services/in-memory-data.service';

// Services
import { EmitterService }  from './shared/services/emitter.service';
import { PeoplesService } from './shared/services/peoples.service';
import { TaskService } from './shared/services/task.service';
import { SkillsService } from './shared/services/skills.service';
import { TaskContributionService } from './shared/services/task-contribution.service';

export class CustomOption extends ToastOptions {
  positionClass: 'toast-bottom-right';
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
}

const appRoutes: Routes = [
  { path: '', component: BodyContentsComponent },
  {
    path: 'reports',
    component: ReportsComponent
  },
  {
    path: 'calendar',
    component: CalendarTaskComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyContentsComponent,
    PeoplesComponent,
    AddTaskComponent,
    BoardComponent,
    ReportsComponent,
    TopContributionComponent,
    MainbodyContentsComponent,
    CalendarTaskComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ButtonsModule,
    DialogModule,
    InputsModule,
    DropDownsModule,
    DateInputsModule,
    InMemoryWebApiModule.forRoot(MockData),
    DndModule.forRoot(),
    ChartModule,
    ToastModule.forRoot(),
    MomentModule
  ],
  providers: [
    PeoplesService,
    TaskService,
    SkillsService,
    EmitterService,
    TaskContributionService,
    {provide: ToastOptions, useClass: CustomOption},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
