import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalKelasComponent } from './modal-kelas.component';

describe('ModalKelasComponent', () => {
  let component: ModalKelasComponent;
  let fixture: ComponentFixture<ModalKelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalKelasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalKelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
