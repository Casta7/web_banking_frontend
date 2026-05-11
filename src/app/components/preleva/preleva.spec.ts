import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Preleva } from './preleva';

describe('Preleva', () => {
  let component: Preleva;
  let fixture: ComponentFixture<Preleva>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Preleva],
    }).compileComponents();

    fixture = TestBed.createComponent(Preleva);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
