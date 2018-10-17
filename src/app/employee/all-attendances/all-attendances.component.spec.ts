import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAttendancesComponent } from './all-attendances.component';

describe('AllAttendancesComponent', () => {
  let component: AllAttendancesComponent;
  let fixture: ComponentFixture<AllAttendancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllAttendancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllAttendancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
