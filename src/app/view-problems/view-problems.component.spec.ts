import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProblemsComponent } from './view-problems.component';

describe('ViewProblemsComponent', () => {
  let component: ViewProblemsComponent;
  let fixture: ComponentFixture<ViewProblemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewProblemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
