import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectTaskComponent } from './my-project-task.component';

describe('MyProjectTaskComponent', () => {
  let component: MyProjectTaskComponent;
  let fixture: ComponentFixture<MyProjectTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProjectTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
