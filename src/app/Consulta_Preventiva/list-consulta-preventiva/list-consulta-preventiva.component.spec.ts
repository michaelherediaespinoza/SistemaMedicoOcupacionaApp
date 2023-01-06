import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsultaPreventivaComponent } from './list-consulta-preventiva.component';

describe('ListConsultaPreventivaComponent', () => {
  let component: ListConsultaPreventivaComponent;
  let fixture: ComponentFixture<ListConsultaPreventivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListConsultaPreventivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConsultaPreventivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
