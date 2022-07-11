import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHapusComponent } from './modal-hapus.component';

describe('ModalHapusComponent', () => {
  let component: ModalHapusComponent;
  let fixture: ComponentFixture<ModalHapusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalHapusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalHapusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
