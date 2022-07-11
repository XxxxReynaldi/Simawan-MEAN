import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPelanggaranComponent } from './modal-pelanggaran.component';

describe('ModalPelanggaranComponent', () => {
  let component: ModalPelanggaranComponent;
  let fixture: ComponentFixture<ModalPelanggaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPelanggaranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPelanggaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
