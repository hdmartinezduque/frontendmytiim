import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFormCompromisoComponent } from './dialog-form-compromiso.component';

describe('DialogFormCompromisoComponent', () => {
  let component: DialogFormCompromisoComponent;
  let fixture: ComponentFixture<DialogFormCompromisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFormCompromisoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFormCompromisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
