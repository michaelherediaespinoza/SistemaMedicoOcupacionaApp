import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamenInicialComponent } from './list-examen-inicial.component';

describe('ListExamenInicialComponent', () => {
  let component: ListExamenInicialComponent;
  let fixture: ComponentFixture<ListExamenInicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExamenInicialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamenInicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
