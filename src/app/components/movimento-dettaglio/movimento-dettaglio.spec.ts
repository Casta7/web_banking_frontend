import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentoDettaglio } from './movimento-dettaglio';

describe('MovimentoDettaglio', () => {
  let component: MovimentoDettaglio;
  let fixture: ComponentFixture<MovimentoDettaglio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovimentoDettaglio],
    }).compileComponents();

    fixture = TestBed.createComponent(MovimentoDettaglio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
