import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingMadeEasy } from './pricing-made-easy';

describe('PricingMadeEasy', () => {
  let component: PricingMadeEasy;
  let fixture: ComponentFixture<PricingMadeEasy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingMadeEasy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricingMadeEasy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
