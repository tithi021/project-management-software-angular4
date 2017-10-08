import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainbodyContentsComponent } from './mainbody-contents.component';

describe('MainbodyContentsComponent', () => {
  let component: MainbodyContentsComponent;
  let fixture: ComponentFixture<MainbodyContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainbodyContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainbodyContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
