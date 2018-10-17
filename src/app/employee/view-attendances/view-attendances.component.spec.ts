import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAttendancesComponent } from './view-attendances.component';

describe('ViewAttendancesComponent', () => {
  let component: ViewAttendancesComponent;
  let fixture: ComponentFixture<ViewAttendancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAttendancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
