import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, OnChanges, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PeoplesModel } from './../../shared/models/peoples.model';
import { EmitterService } from './../../shared/services/emitter.service';
import { PeoplesService } from './../../shared/services/peoples.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-peoples',
  templateUrl: './peoples.component.html',
  styleUrls: [
      './peoples.component.scss'
  ],
  // prevent style encapsulation
  encapsulation: ViewEncapsulation.None
})
export class PeoplesComponent implements OnInit {

  peoples: PeoplesModel[] = [];
  errorMessage;
  public opened: boolean = false;
  public name: string;
  public designation: string;
  public selectedName: string;

  emitter = EmitterService.get("PeoplesChannel");

  public openedShortProfile: boolean = false;
  public seletedPeopleName: string;
  public selectedPeoplePhoto: string;
  public selectedPeopleDesignation: string;


  constructor(
    public peoplesService: PeoplesService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  mouseover(name) {
    this.selectedName = name;
    document.getElementById('popup').style.display = 'block';
  }
  mouseleave() {
    document.getElementById('popup').style.display = 'none';
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

  ngOnInit() {
    this.getAllPeople();
  }

  public close() {
    this.opened = false;
  }

  public openPopup() {
    this.opened = true;
  }

  // Add new Team Member
  addNewMember() {
    let data = {
      id: this.peoples.length+1,
      name: this.name,
      designation: this.designation,
      photo: 'https://cdn1.iconfinder.com/data/icons/unique-round-blue/93/user-512.png'
    }

    // Variable to hold a reference of addComment/updateComment
    let peopleOperation:Observable<PeoplesModel[]>;

    peopleOperation = this.peoplesService.addPeople(data);

    // Subscribe to observable
    peopleOperation.subscribe(
      peoples => {
          // Emit list event
          this.peoples.push(data);
          this.name = '';
          this.designation = '';
          this.opened = false;
          this.emitter.emit('Broadcast!');
          this.toastr.success('You Added One More People!');
      }, 
      err => {
          // Log errors if any
          console.log(err);
      });
  }
  
  openShortProfile(contributor) {
    this.openedShortProfile = true;
    this.seletedPeopleName = contributor.name;
    this.selectedPeoplePhoto = contributor.photo;
    this.selectedPeopleDesignation = contributor.designation;
  }
  public closeShortProfile(status) {
    console.log(`Dialog result: ${status}`);
    this.openedShortProfile = false;
  }

}
