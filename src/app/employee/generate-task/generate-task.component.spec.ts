import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTaskComponent } from './generate-task.component';

describe('GenerateTaskComponent', () => {
  let component: GenerateTaskComponent;
  let fixture: ComponentFixture<GenerateTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
