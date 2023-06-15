import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompromisesComponent } from './my-compromises.component';

describe('MyCompromisesComponent', () => {
  let component: MyCompromisesComponent;
  let fixture: ComponentFixture<MyCompromisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCompromisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCompromisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
