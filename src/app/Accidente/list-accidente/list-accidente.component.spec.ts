import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccidenteComponent } from './list-accidente.component';

describe('ListAccidenteComponent', () => {
  let component: ListAccidenteComponent;
  let fixture: ComponentFixture<ListAccidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccidenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
