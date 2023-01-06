import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPacientesparaEmrComponent } from './list-pacientespara-emr.component';

describe('ListPacientesparaEmrComponent', () => {
  let component: ListPacientesparaEmrComponent;
  let fixture: ComponentFixture<ListPacientesparaEmrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPacientesparaEmrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPacientesparaEmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
