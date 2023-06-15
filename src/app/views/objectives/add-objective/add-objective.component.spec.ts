import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObjectiveComponent } from './add-objective.component';

describe('AddObjectiveComponent', () => {
  let component: AddObjectiveComponent;
  let fixture: ComponentFixture<AddObjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddObjectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
