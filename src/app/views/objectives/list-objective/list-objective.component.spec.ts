import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListObjectiveComponent } from './list-objective.component';

describe('ListObjectiveComponent', () => {
  let component: ListObjectiveComponent;
  let fixture: ComponentFixture<ListObjectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListObjectiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListObjectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
