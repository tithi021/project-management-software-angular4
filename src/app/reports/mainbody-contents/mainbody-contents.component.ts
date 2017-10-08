import { Component, OnInit } from '@angular/core';

import { PeoplesModel } from '../../shared/models/peoples.model';
import { PeoplesService } from '../../shared/services/peoples.service';

import { TaskContributionService } from '../../shared/services/task-contribution.service';
import { TaskContributionModel } from './../../shared/models/task-contribution.model';


@Component({
  selector: 'app-mainbody-contents',
  templateUrl: './mainbody-contents.component.html',
  styleUrls: ['./mainbody-contents.component.scss']
})
export class MainbodyContentsComponent implements OnInit {

  peoples: PeoplesModel[] = [];

  taskContributorData: TaskContributionModel[] =[];
  private series: Array<any> = [];

  private months: string[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  private tasksData: any = [
    { category: 'Total Task', value: 15 },
    { category: 'In Progress Task', value: 4 },
    { category: 'Completed Task', value: 3 }
  ]

  private skillData: any = [
    { category: 'Total Skill', value: 12 },
    { category: 'Team Skills', value: 10 }
  ]

  private contributionData: any = [
    { category: 'Need Contribution', value: 100 },
    { category: 'Team Contribution', value: 72 }
  ]

  constructor(
    public peoplesService: PeoplesService,
    public taskContributionService: TaskContributionService
  ) { }

  ngOnInit() {
    this.getTaskContributor();
  }

  getTaskContributor() {
    this.taskContributionService.getTaskContribution()
    .subscribe(
      tasks => {
        this.taskContributorData = tasks;

        this.peoplesService.getPeoples()
        .subscribe(
            peoples => {
              this.peoples = peoples;
              for (var people of Object.keys(this.peoples)) {
                for(var task of Object.keys(this.taskContributorData)) {
      
                  if(this.taskContributorData[task].people === this.peoples[people].id) {
                    this.series.push({name: this.peoples[people].name, data: this.taskContributorData[task].data});

                  }
                }
              }
              
            },
            err => {
                // Log errors if any
                console.log(err);
            });
      },
      err => {
          // Log errors if any
          console.log(err);
      });
  }
}
