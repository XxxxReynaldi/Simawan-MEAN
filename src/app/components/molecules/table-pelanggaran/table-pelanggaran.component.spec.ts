import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePelanggaranComponent } from './table-pelanggaran.component';

describe('TablePelanggaranComponent', () => {
  let component: TablePelanggaranComponent;
  let fixture: ComponentFixture<TablePelanggaranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePelanggaranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePelanggaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
