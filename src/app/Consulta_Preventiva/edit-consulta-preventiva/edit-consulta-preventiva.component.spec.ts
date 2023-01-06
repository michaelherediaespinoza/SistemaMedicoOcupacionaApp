import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConsultaPreventivaComponent } from './edit-consulta-preventiva.component';

describe('EditConsultaPreventivaComponent', () => {
  let component: EditConsultaPreventivaComponent;
  let fixture: ComponentFixture<EditConsultaPreventivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditConsultaPreventivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConsultaPreventivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
