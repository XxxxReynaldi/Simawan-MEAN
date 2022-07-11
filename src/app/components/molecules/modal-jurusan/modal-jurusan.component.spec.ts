import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalJurusanComponent } from './modal-jurusan.component';

describe('ModalJurusanComponent', () => {
  let component: ModalJurusanComponent;
  let fixture: ComponentFixture<ModalJurusanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalJurusanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalJurusanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
