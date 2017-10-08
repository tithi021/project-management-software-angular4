import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmitterService } from './../../shared/services/emitter.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { TaskModel } from './../../shared/models/tasks.model';
import { ProgressTaskModel } from './../../shared/models/progress-task.model';
import { CompletedTaskModel } from './../../shared/models/completed-task.model';
import { TaskService } from './../../shared/services/task.service';
import { PeoplesModel } from './../../shared/models/peoples.model';
import { PeoplesService } from './../../shared/services/peoples.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  tasks: TaskModel[] = [];
  peoples: PeoplesModel[] = [];
  emitter = EmitterService.get("PeoplesChannel");
  listTeamOne:ProgressTaskModel[] = [];
  listTeamTwo:CompletedTaskModel[] = [];
  public opened: boolean = false;

  private pieData: any = [
    { category: 'In Progress', value: 2 },
    { category: 'Completed', value: 2 }
  ]

  public seletedTaskTitle: string;
  public selectedTaskStartDate: string;
  public selectedTaskEndDate: string;
  public seletedTaskPeople: number;

  constructor(
    public taskService: TaskService,
    public peoplesService: PeoplesService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {}


  ngOnInit() {
    this.getAllPeople();
    this.getAllTasks();
    this.getAllCompletedTask();
    this.getAllInProgressTask();

    this.emitter.subscribe(msg => {
      if(msg.msg === 'BroadcastTask') {
        this.tasks.push(msg.data);
      }
    });

  }

  // Get all tasks
  getAllTasks() {
    // Get all tasks
    this.taskService.getTask()
    .subscribe(
      tasks => {
        this.tasks = tasks;
      },
      err => {
          // Log errors if any
          console.log(err);
      });
  }

  // Get ALl Completed Task
  getAllCompletedTask() {
    this.taskService.getCompletedTask()
    .subscribe(
      tasks => {
        this.listTeamTwo = tasks;
      },
      err => {
          // Log errors if any
          console.log(err);
      });
  }

  // Get ALl in-progress Task
  getAllInProgressTask() {
    this.taskService.getInProgressTask()
    .subscribe(
      tasks => {
        this.listTeamOne = tasks;
      },
      err => {
          // Log errors if any
          console.log(err);
      });
  }

  // Get all peoples
  getAllPeople() {
    // Get all peoples
    this.peoplesService.getPeoples()
    .subscribe(
        peoples => {
          this.peoples = peoples;
        },
        err => {
            // Log errors if any
            console.log(err);
        });
  }

  // Drop on success
  addTo($event: any, item, data) {
    if(data === 'ToDo') {
      this.toastr.success('Task ' + item.title + ' added in To Do board!');
    }
    if(data === 'Progress') {
      
      let object = {
        id: this.listTeamOne.length,
        title: item.title,
        people: item.people,
        skills: item.skills,
        startDate: item.startDate,
        endDate: item.endDate,
        start: item.startDate,
        end: item.endDate,
        backgroundColor: '#dff0d8'
      };
     
      let taskOperation:Observable<ProgressTaskModel[]>;

      taskOperation = this.taskService.addTaskInProgress(object);

      // Subscribe to observable
      taskOperation.subscribe(
        task => {
          // this.listTeamOne.push(object);
          this.toastr.success('Task ' + item.title + ' added in Progress board!');
        }, 
        err => {
            // Log errors if any
            console.log(err);
        });
    }

    if(data === 'Completed') {
      let object = {
        id: this.listTeamTwo.length,
        title: item.title,
        people: item.people,
        skills: item.skills,
        startDate: item.startDate,
        endDate: item.endDate,
        start: item.startDate,
        end: item.endDate,
        backgroundColor: '#d9edf7'
      };
      let taskOperation:Observable<CompletedTaskModel[]>;

      taskOperation = this.taskService.addTaskInComplete(object);

      // Subscribe to observable
      taskOperation.subscribe(
        task => {
          // this.listTeamTwo.push(object);
          this.toastr.success('Task ' + item.title + ' added in Completed!');
        }, 
        err => {
            // Log errors if any
            console.log(err);
        });

    }
    this.pieData[0].value = this.listTeamOne.length;
    this.pieData[1].value = this.listTeamTwo.length;

    this.pieData = [
      { category: 'In Progress', value: this.listTeamOne.length },
      { category: 'Completed', value: this.listTeamTwo.length }
    ]

  }

  // Open Task Popup details
  openTask(task) {
    this.opened = true;
    console.log(task)
    this.seletedTaskTitle = task.title ;
    this.selectedTaskStartDate = task.startDate;
    this.selectedTaskEndDate = task.endDate;
    this.seletedTaskPeople = task.people;

  }
  public close() {
    this.opened = false;
  }
}
