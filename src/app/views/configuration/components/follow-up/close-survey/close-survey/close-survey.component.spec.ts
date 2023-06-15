import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSurveyComponent } from './close-survey.component';

describe('CloseSurveyComponent', () => {
  let component: CloseSurveyComponent;
  let fixture: ComponentFixture<CloseSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
