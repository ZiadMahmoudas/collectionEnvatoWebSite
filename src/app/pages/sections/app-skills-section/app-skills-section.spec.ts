import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSkillsSection } from './app-skills-section';

describe('AppSkillsSection', () => {
  let component: AppSkillsSection;
  let fixture: ComponentFixture<AppSkillsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppSkillsSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSkillsSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
