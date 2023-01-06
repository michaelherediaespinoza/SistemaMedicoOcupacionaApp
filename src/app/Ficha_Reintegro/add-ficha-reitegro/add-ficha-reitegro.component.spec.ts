import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFichaReitegroComponent } from './add-ficha-reitegro.component';

describe('AddFichaReitegroComponent', () => {
  let component: AddFichaReitegroComponent;
  let fixture: ComponentFixture<AddFichaReitegroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFichaReitegroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFichaReitegroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
