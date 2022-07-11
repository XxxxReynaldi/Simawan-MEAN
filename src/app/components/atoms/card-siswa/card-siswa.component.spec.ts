import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSiswaComponent } from './card-siswa.component';

describe('CardSiswaComponent', () => {
  let component: CardSiswaComponent;
  let fixture: ComponentFixture<CardSiswaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSiswaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSiswaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
