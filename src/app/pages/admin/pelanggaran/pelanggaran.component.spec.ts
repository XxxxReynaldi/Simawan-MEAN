import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelanggaranComponent } from './pelanggaran.component';

describe('PelanggaranComponent', () => {
  let component: PelanggaranComponent;
  let fixture: ComponentFixture<PelanggaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelanggaranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PelanggaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
