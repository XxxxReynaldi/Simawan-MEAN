import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalValidasiSiswaComponent } from './modal-validasi-siswa.component';

describe('ModalValidasiSiswaComponent', () => {
  let component: ModalValidasiSiswaComponent;
  let fixture: ComponentFixture<ModalValidasiSiswaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalValidasiSiswaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalValidasiSiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
