import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardKelasComponent } from './card-kelas.component';

describe('CardKelasComponent', () => {
  let component: CardKelasComponent;
  let fixture: ComponentFixture<CardKelasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardKelasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardKelasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
