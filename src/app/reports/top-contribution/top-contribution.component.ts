import { Component, OnInit } from '@angular/core';

import { ProgressTaskModel } from '../../shared/models/progress-task.model';
import { CompletedTaskModel } from '../../shared/models/completed-task.model';
import { PeoplesModel } from '../../shared/models/peoples.model';
import { TaskService } from '../../shared/services/task.service';
import { PeoplesService } from '../../shared/services/peoples.service';

@Component({
  selector: 'app-top-contribution',
  templateUrl: './top-contribution.component.html',
  styleUrls: ['./top-contribution.component.scss']
})
export class TopContributionComponent implements OnInit {

  completeTasks: CompletedTaskModel[] = [];
  progressTasks: ProgressTaskModel[] = [];
  peoples: PeoplesModel[] = [];
  public topContributor: any;
  public contributor: Array<any> = [];


  public opened: boolean = false;
  public seletedPeopleName: string;
  public selectedPeoplePhoto: string;
  public selectedPeopleDesignation: string;

  constructor(
    public taskService: TaskService,
    public peoplesService: PeoplesService
  ) { }

  ngOnInit() {
    this.getAllCompletedTask();
  }

  // Count Array Duplicate Property
  dedupeByKey(arr, key) {
    const tmp = {};
    return arr.reduce((p, c) => {
      const k = c[key];
      if (tmp[k]) return p;
      tmp[k] = true;
      return p.concat(c);
    }, []);
  }
  

  // Get ALl Completed Task
  getAllCompletedTask() {
    this.taskService.getCompletedTask()
    .subscribe(
      tasks => {
        this.completeTasks = tasks;

        // Get all peoples
        this.peoplesService.getPeoples()
        .subscribe(
            peoples => {
              
              this.peoples = peoples;

              for (var task of Object.keys(this.completeTasks)) {
                for (var people of Object.keys(this.peoples)) {
                  if(this.completeTasks[task].people === this.peoples[people].id) {
                    
                    this.contributor.push(this.peoples[people]);
                  }
                }
              }

              this.topContributor = this.dedupeByKey(this.contributor, 'id');

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

  openShortProfile(contributor) {
    this.opened = true;
    this.seletedPeopleName = contributor.name;
    this.selectedPeoplePhoto = contributor.photo;
    this.selectedPeopleDesignation = contributor.designation;
  }
  public close(status) {
    console.log(`Dialog result: ${status}`);
    this.opened = false;
  }

}
