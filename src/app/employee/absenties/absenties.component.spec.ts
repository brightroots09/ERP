import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsentiesComponent } from './absenties.component';

describe('AbsentiesComponent', () => {
  let component: AbsentiesComponent;
  let fixture: ComponentFixture<AbsentiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsentiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsentiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
