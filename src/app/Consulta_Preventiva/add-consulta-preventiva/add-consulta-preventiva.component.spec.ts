import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConsultaPreventivaComponent } from './add-consulta-preventiva.component';

describe('AddConsultaPreventivaComponent', () => {
  let component: AddConsultaPreventivaComponent;
  let fixture: ComponentFixture<AddConsultaPreventivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConsultaPreventivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConsultaPreventivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
