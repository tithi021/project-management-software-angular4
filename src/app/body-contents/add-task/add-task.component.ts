import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmitterService } from './../../shared/services/emitter.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { PeoplesModel } from './../../shared/models/peoples.model';
import { PeoplesService } from './../../shared/services/peoples.service';

import { SkillModel } from './../../shared/models/skills.model';
import { SkillsService } from './../../shared/services/skills.service';

import { TaskModel } from './../../shared/models/tasks.model';
import { TaskService } from './../../shared/services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  emitter = EmitterService.get("PeoplesChannel");

  peoples: PeoplesModel[] = [];
  skills: SkillModel[] = [];
  tasks: TaskModel[] = [];
  
  public startDate: Date = new Date();
  public endDate: Date = new Date();

  title: string;
  public selectedSkills;
  public selectedPeople: number = 2;
  
  constructor(
    public peoplesService: PeoplesService,
    public skillsService: SkillsService,
    public taskService: TaskService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
    this.getAllPeople();
    this.getAllSkills();

    this.emitter.subscribe(msg => {
      this.getAllPeople();
    });
  }

  showSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
      }

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

  getAllSkills() {
    // Get all skills
    this.skillsService.getSkills()
    .subscribe(
        skills => {
          this.skills = skills;
        },
        err => {
            // Log errors if any
            console.log(err);
        });
  }

  addTask() {
    let taskObject = {
      title: this.title,
      people: this.selectedPeople,
      skills: this.selectedSkills,
      startDate: this.startDate.toLocaleDateString(),
      endDate: this.endDate.toLocaleDateString(),
      start: this.startDate.toLocaleDateString(),
      end: this.endDate.toLocaleDateString(),
      backgroundColor: '#fcf8e3'
    };

    
    let taskOperation:Observable<TaskModel[]>;

    taskOperation = this.taskService.addTask(taskObject);

    // Subscribe to observable
    taskOperation.subscribe(
      task => {
        this.emitter.emit({msg: 'BroadcastTask', data: task});
        this.title = '';
        this.selectedPeople = 1;
        this.selectedSkills = [];
        
        this.toastr.success('One More Task Added In Board!');
      }, 
      err => {
          // Log errors if any
          console.log(err);
      });
  }
}
