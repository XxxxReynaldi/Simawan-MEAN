import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUploadImageComponent } from './modal-upload-image.component';

describe('ModalUploadImageComponent', () => {
  let component: ModalUploadImageComponent;
  let fixture: ComponentFixture<ModalUploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUploadImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
