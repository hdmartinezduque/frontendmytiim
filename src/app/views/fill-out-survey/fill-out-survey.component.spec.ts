import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FillOutSurveyComponent } from './fill-out-survey.component';

describe('FillOutSurveyComponent', () => {
  let component: FillOutSurveyComponent;
  let fixture: ComponentFixture<FillOutSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FillOutSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FillOutSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
