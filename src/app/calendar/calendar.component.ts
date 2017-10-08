import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { TaskModel } from './../shared/models/tasks.model';
import { TaskService } from './../shared/services/task.service';
import { ProgressTaskModel } from './../shared/models/progress-task.model';
import { CompletedTaskModel } from './../shared/models/completed-task.model';

import * as $ from 'jquery';
import * as moment from "moment";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarTaskComponent implements OnInit, AfterViewInit {

  calendarOptions: any;
  tasks: TaskModel[] = [];
  progressTasks:ProgressTaskModel[] = [];
  completedTask:CompletedTaskModel[] = [];
  @ViewChild('mycal', { read: ElementRef }) myCal: ElementRef;
  
  public todoColor: string;
  public inprogressColor: string;
  public completeColor: string;

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.getAllTasks();
    this.todoColor = '#fcf8e3';
    this.inprogressColor= '#dff0d8';
    this.completeColor= '#d9edf7';
  }


  ngAfterViewInit() {
    
    /** Define Calendar Options  */
    this.calendarOptions = {
      fixedWeekCount: false,
      editable: true,
      aspectRatio: 2,
      height: 600,
      displayEventTime: false,
      eventColor: 'black',
      defaultView: 'month',
      eventTextColor: 'black',
      header: {
        left: 'prev',
        center: 'title',
        right: 'next'
      },
      footer: {
        center: 'month,basicWeek,basicDay,list',
      },
      buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List'
      },
      eventLimit: true, // allow "more" link when too many events
      events: [],
      dayClick: function(date, jsEvent, view) {
        if (view.name === "month") {
          $('#mycal').fullCalendar('gotoDate', date);
          $('#mycal').fullCalendar('changeView', 'agendaDay');
        }
      },
      eventMouseover: function (data, event, view) {
           let tooltip = '<div class="tooltiptopicevent" style="width:auto;height:auto;background:#ff6358;color: #ffffff;position:absolute;z-index:10001;padding:10px 10px 10px 10px ;  line-height: 200%;">' +
           data.title + '</div>';


            $("body").append(tooltip);
            $(this).mouseover(function (e) {
                $(this).css('z-index', 10000);
                $('.tooltiptopicevent').fadeIn('500');
                $('.tooltiptopicevent').fadeTo('10', 1.9);
            }).mousemove(function (e) {
                $('.tooltiptopicevent').css('top', e.pageY + 10);
                $('.tooltiptopicevent').css('left', e.pageX + 20);
            });


        },
        eventMouseout: function (data, event, view) {
            $(this).css('z-index', 8);

            $('.tooltiptopicevent').remove();

        },
    };
  }


  // Calendar Event Update Functions
  UpdateCalendar(events) {
    this.calendarOptions.events = events
    $(this.myCal.nativeElement).fullCalendar('addEventSource', events)
  }

  // Get all tasks
  getAllTasks() {
    // Get all tasks
    this.taskService.getTask().subscribe(tasks => {
      this.tasks = tasks;
      this.taskService.getCompletedTask()
      .subscribe(
        completedTask => {
          this.completedTask = completedTask;
          this.taskService.getInProgressTask()
            .subscribe(
              progressTasks => {
                this.progressTasks = progressTasks;
                let newArray = this.tasks.concat(this.progressTasks, this.completedTask);
                this.UpdateCalendar(newArray);
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

      
    }, err => {
      // Log errors if any
      console.log(err);
    });
  }
}
