import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTaskDetailsComponent } from './my-task-details.component';

describe('MyTaskDetailsComponent', () => {
  let component: MyTaskDetailsComponent;
  let fixture: ComponentFixture<MyTaskDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTaskDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
