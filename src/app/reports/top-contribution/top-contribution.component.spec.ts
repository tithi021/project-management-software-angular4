import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopContributionComponent } from './top-contribution.component';

describe('TopContributionComponent', () => {
  let component: TopContributionComponent;
  let fixture: ComponentFixture<TopContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
