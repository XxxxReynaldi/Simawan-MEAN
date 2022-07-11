import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardJurusanComponent } from './card-jurusan.component';

describe('CardJurusanComponent', () => {
  let component: CardJurusanComponent;
  let fixture: ComponentFixture<CardJurusanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardJurusanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardJurusanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
