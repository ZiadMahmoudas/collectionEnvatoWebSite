// skills-marquee.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  percentage: number;
  color: string;
  icon: string;
}

@Component({
  selector: 'app-skills-marquee',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="skills-section">
      <div class="container">
        <!-- Header -->
        <div class="section-header">
          <p class="subtitle">TECH STACK</p>
          <h2 class="title">Skills</h2>
        </div>

        <!-- كل skill في سطر لوحده -->
        <div *ngFor="let skill of skills; let i = index" 
             class="animated-strip" 
             (mouseenter)="onStripHover(i, true)"
             (mouseleave)="onStripHover(i, false)"
             [class.hovered]="hoveredStrip === i">
          
          <div class="skills-marquee">
            <!-- First Track -->
            <div class="skills-track" 
                 [class.animate]="hoveredStrip === i"
                 [style.animation-duration]="(30 + i * 5) + 's'">
              
              <ng-container *ngFor="let _ of repeatArray">
                <!-- قبل الـ hover: اسم الـ skill بس -->
                <span *ngIf="hoveredStrip !== i" 
                      class="single-word"
                      [style.color]="skill.color + '80'">
                  {{ skill.name }}
                </span>
                
                <!-- بعد الـ hover: الـ skill كامل متكرر -->
                <div *ngIf="hoveredStrip === i" class="skill-item">
                  <!-- Icon -->
                  <div class="skill-icon" [style.background]="skill.color + '20'">
                    <img [src]="skill.icon" [alt]="skill.name">
                  </div>
                  
                  <!-- Skill Name -->
                  <span class="skill-name" [style.color]="skill.color">
                    {{ skill.name }}
                  </span>
                  
                  <!-- Percentage Badge -->
                  <span class="skill-percentage" [style.background]="skill.color">
                    {{ skill.percentage }}%
                  </span>
                </div>
              </ng-container>
            </div>

            <!-- Second Track (للـ seamless loop) -->
            <div class="skills-track" 
                 [class.animate]="hoveredStrip === i"
                 [style.animation-duration]="(30 + i * 5) + 's'">
              
              <ng-container *ngFor="let _ of repeatArray">
                <span *ngIf="hoveredStrip !== i" 
                      class="single-word"
                      [style.color]="skill.color + '80'">
                  {{ skill.name }}
                </span>
                
                <div *ngIf="hoveredStrip === i" class="skill-item">
                  <div class="skill-icon" [style.background]="skill.color + '20'">
                    <img [src]="skill.icon" [alt]="skill.name">
                  </div>
                  
                  <span class="skill-name" [style.color]="skill.color">
                    {{ skill.name }}
                  </span>
                  
                  <span class="skill-percentage" [style.background]="skill.color">
                    {{ skill.percentage }}%
                  </span>
                </div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .skills-section {
      background: #000;
      color: #fff;
      padding: 100px 0;
      overflow: hidden;
      min-height: 100vh;
      display: flex;
      align-items: center;
    }

    .container {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .section-header {
      text-align: center;
      margin-bottom: 80px;
    }

    .subtitle {
      font-size: 14px;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 20px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .title {
      font-size: 64px;
      font-weight: 700;
      margin: 0;
      line-height: 1.2;
      background: linear-gradient(to right, #fff, rgba(255,255,255,0.6));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    @media (max-width: 768px) {
      .title {
        font-size: 48px;
      }
    }

    /* Animated Strip Container - كل skill في سطر */
    .animated-strip {
      background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 25px 0;
      cursor: pointer;
      transition: all 0.4s ease;
      overflow: hidden;
      margin-bottom: 30px;
    }

    .animated-strip:last-child {
      margin-bottom: 0;
    }

    .animated-strip.hovered {
      background: linear-gradient(90deg, rgba(7, 196, 44, 0.08) 0%, rgba(7, 196, 44, 0.15) 50%, rgba(7, 196, 44, 0.08) 100%);
      border-color: rgba(7, 196, 44, 0.3);
      box-shadow: 0 0 30px rgba(7, 196, 44, 0.2), inset 0 0 20px rgba(7, 196, 44, 0.1);
      padding: 30px 0;
    }

    /* Marquee Container */
    .skills-marquee {
      display: flex;
      width: fit-content;
    }

    /* Tracks for seamless loop */
    .skills-track {
      display: flex;
      align-items: center;
      gap: 80px;
      padding-right: 80px;
      animation: scroll-continuous linear infinite;
      white-space: nowrap;
    }

    .skills-track.animate {
      gap: 50px;
      padding-right: 50px;
    }

    @keyframes scroll-continuous {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    /* Single Word (قبل الـ hover) */
    .single-word {
      font-size: 56px;
      font-weight: 700;
      letter-spacing: -0.02em;
      transition: all 0.3s ease;
      text-shadow: 0 0 15px currentColor;
    }

    @media (max-width: 768px) {
      .single-word {
        font-size: 40px;
      }
    }

    @media (max-width: 480px) {
      .single-word {
        font-size: 32px;
      }
    }

    /* Skill Item (بعد الـ hover) */
    .skill-item {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 15px 35px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 50px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      transition: all 0.3s ease;
      min-width: fit-content;
      animation: skill-appear 0.5s ease-out;
    }

    @keyframes skill-appear {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .skill-item:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
      border-color: rgba(255, 255, 255, 0.3);
    }

    /* Skill Icon */
    .skill-icon {
      width: 65px;
      height: 65px;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      overflow: hidden;
      animation: icon-spin 0.6s ease-out;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    @keyframes icon-spin {
      from {
        transform: rotate(-180deg) scale(0);
        opacity: 0;
      }
      to {
        transform: rotate(0deg) scale(1);
        opacity: 1;
      }
    }

    .skill-icon img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 12px;
    }

    @media (max-width: 768px) {
      .skill-icon {
        width: 55px;
        height: 55px;
      }
    }

    /* Skill Name */
    .skill-name {
      font-size: 48px;
      font-weight: 700;
      letter-spacing: -0.02em;
      text-shadow: 0 0 20px currentColor;
      animation: name-glow 2s ease-in-out infinite;
    }

    @keyframes name-glow {
      0%, 100% {
        text-shadow: 0 0 20px currentColor;
      }
      50% {
        text-shadow: 0 0 30px currentColor, 0 0 40px currentColor;
      }
    }

    @media (max-width: 768px) {
      .skill-name {
        font-size: 36px;
      }
    }

    @media (max-width: 480px) {
      .skill-name {
        font-size: 28px;
      }
    }

    /* Skill Percentage */
    .skill-percentage {
      padding: 10px 22px;
      border-radius: 30px;
      font-size: 18px;
      font-weight: 700;
      color: #fff;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      min-width: 75px;
      text-align: center;
      animation: badge-pulse 2s ease-in-out infinite;
    }

    @keyframes badge-pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    @media (max-width: 768px) {
      .skill-percentage {
        font-size: 16px;
        padding: 8px 18px;
        min-width: 65px;
      }
    }
  `]
})
export class SkillsMarqueeComponent {
  skills: Skill[] = [
    { name: 'Figma', percentage: 96, color: '#A259FF', icon: 'images/app-figma.png' },
    { name: 'Framer', percentage: 98, color: '#0099FF', icon: 'images/app-framer.png' },
    { name: 'Webflow', percentage: 92, color: '#4353FF', icon: 'images/app-webflow.png' }
  ];

  hoveredStrip: number | null = null;
  repeatArray = new Array(25); // كرر 25 مرة عشان continuous loop

  onStripHover(index: number, isHovered: boolean): void {
    this.hoveredStrip = isHovered ? index : null;
  }
}