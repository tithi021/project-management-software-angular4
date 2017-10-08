import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyContentsComponent } from './body-contents.component';

describe('BodyContentsComponent', () => {
  let component: BodyContentsComponent;
  let fixture: ComponentFixture<BodyContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyContentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
