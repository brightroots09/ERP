import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAbsentiesComponent } from './add-absenties.component';

describe('AddAbsentiesComponent', () => {
  let component: AddAbsentiesComponent;
  let fixture: ComponentFixture<AddAbsentiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAbsentiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAbsentiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
