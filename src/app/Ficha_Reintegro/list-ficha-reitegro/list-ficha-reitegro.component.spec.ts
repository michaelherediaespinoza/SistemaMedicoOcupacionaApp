import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFichaReitegroComponent } from './list-ficha-reitegro.component';

describe('ListFichaReitegroComponent', () => {
  let component: ListFichaReitegroComponent;
  let fixture: ComponentFixture<ListFichaReitegroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFichaReitegroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFichaReitegroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
