import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JblMainComponent } from './jbl-main.component';

describe('JblMainComponent', () => {
  let component: JblMainComponent;
  let fixture: ComponentFixture<JblMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JblMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JblMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
