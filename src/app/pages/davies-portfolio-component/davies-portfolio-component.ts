// davies-portfolio.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-Ziad-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './davies-portfolio-component.html',
  styleUrls: ['./davies-portfolio-component.scss']
})
export class DaviesPortfolioComponent implements OnInit {
  hoveredCard: number | null = null;
  scrollY = 0;
  isMenuHovered = false;
  
  // Menu items for seamless marquee (كرر النص كتير عشان ميبقاش في فواصل)

  versions = [
    {
      id: 1,
      title: "VERSION 1",
      subtitle: "CSS Edition",
      preview: "images/webp.png",
      features: ["REDESIGNER", "RESUME", "THEME ANALYZER"],
      badge: "AVAILABLE FOR RESALE",
      year: "© 2023",
      description: "I craft next-level modern websites with purpose. Live, breath and even design creative for makers, my core design is just mind-blowing.",
      glowColor: "rgba(34, 197, 94, 0.3)",
      link: "https://huss123.netlify.app"
    },
    {
      id: 2,
      title: "VERSION 2", 
      subtitle: "CSS Edition",
      preview: "images/w.png",
      features: [
        "Independent Product Designer - 2025",
        "Senior UX Designer at CloudForge - 2023 - 2025", 
        "Product Designer for Data Software - 2022 - 2024",
        "Lead Designer at ThinkBox - 2021 - 2022",
        "Junior Designer at BrightLine Studio - 2020 - 2021"
      ],
      techStack: ["Figma", "Framer", "Webflow"],
      badge: "Tech Stack",
      glowColor: "rgba(59, 130, 246, 0.3)",
      link: "/FirstProfile"
    }
  ];

  // Menu items for marquee effect
  menuItems:any = Array(15).fill('// View Works');

  ngOnInit() {
    this.initAnimations();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollY = window.scrollY ;
  }

  setHoveredCard(id: number | null) {
    this.hoveredCard = id;
  }

  onMenuHover(isHovered: boolean) {
    this.isMenuHovered = isHovered;
  }

  private initAnimations() {
    setTimeout(() => {
      this.animateElements();
    }, 100);
  }

  private animateElements() {
    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-in');
      }, index * 200);
    });
  }

  downloadCV() {
    console.log('Downloading CV...');
  }
}