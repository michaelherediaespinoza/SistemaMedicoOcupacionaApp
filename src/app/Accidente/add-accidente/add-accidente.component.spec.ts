import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccidenteComponent } from './add-accidente.component';

describe('AddAccidenteComponent', () => {
  let component: AddAccidenteComponent;
  let fixture: ComponentFixture<AddAccidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAccidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
