import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinuousSurveyComponent } from './continuous-survey.component';

describe('ContinuousSurveyComponent', () => {
  let component: ContinuousSurveyComponent;
  let fixture: ComponentFixture<ContinuousSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinuousSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContinuousSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
