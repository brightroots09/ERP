import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancesDetailsComponent } from './attendances-details.component';

describe('AttendancesDetailsComponent', () => {
  let component: AttendancesDetailsComponent;
  let fixture: ComponentFixture<AttendancesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendancesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
