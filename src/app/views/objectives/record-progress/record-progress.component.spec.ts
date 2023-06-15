import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordProgressComponent } from "./RecordProgressComponent";


describe('RecordProgressComponent', () => {
  let component: RecordProgressComponent;
  let fixture: ComponentFixture<RecordProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
