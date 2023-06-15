import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmDeleteSurveyComponent } from './dialog-confirm-delete-survey.component';

describe('DialogSuccessComponent', () => {
  let component: DialogConfirmDeleteSurveyComponent;
  let fixture: ComponentFixture<DialogConfirmDeleteSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmDeleteSurveyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmDeleteSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
