import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaviesPortfolioComponent } from './davies-portfolio-component';

describe('DaviesPortfolioComponent', () => {
  let component: DaviesPortfolioComponent;
  let fixture: ComponentFixture<DaviesPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaviesPortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaviesPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
