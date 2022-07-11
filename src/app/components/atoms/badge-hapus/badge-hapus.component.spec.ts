import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeHapusComponent } from './badge-hapus.component';

describe('BadgeHapusComponent', () => {
  let component: BadgeHapusComponent;
  let fixture: ComponentFixture<BadgeHapusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeHapusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeHapusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
