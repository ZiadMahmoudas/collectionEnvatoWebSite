// selected-works.component.ts
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, keyframes } from '@angular/animations';

interface Project {
  id: number;
  title: string;
  image: string;
  tech: string;
  description: string;
  meta: { label: string; value: string }[];
}

@Component({
  selector: 'app-selected-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selected-works.html',
  styleUrls: ['./selected-works.scss'],
  animations: [
    // Fade Up Animation
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s cubic-bezier(0.4, 0, 0.2, 1)', 
                style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    
    // Project Image Slide Animation
    trigger('projectSlide', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateX(50px) scale(0.95)' }),
        animate('0.8s cubic-bezier(0.4, 0, 0.2, 1)', 
                style({ opacity: 1, transform: 'translateX(0) scale(1)' }))
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'translateX(-50px) scale(0.95)' }),
        animate('0.8s cubic-bezier(0.4, 0, 0.2, 1)', 
                style({ opacity: 1, transform: 'translateX(0) scale(1)' }))
      ])
    ]),
    
    // Title Animation
    trigger('titleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.6s 0.2s cubic-bezier(0.4, 0, 0.2, 1)', 
                style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('0.4s cubic-bezier(0.4, 0, 0.2, 1)', 
                style({ opacity: 0, transform: 'translateY(-30px)' }))
      ])
    ]),
    
    // Category Animation
    trigger('categoryAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.5s {{delay}}ms cubic-bezier(0.4, 0, 0.2, 1)', 
                style({ opacity: 1, transform: 'translateY(0)' }))
      ], { params: { delay: 0 } }),
      transition(':leave', [
        animate('0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
                style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class SelectedWorksComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  autoSlideInterval: any;
  
  categories = [
    // Categories for Project 1 - NexoPay
    [
      { id: 1, number: '01', name: 'WEBSITE DESIGN', active: true },
      { id: 2, number: '02', name: 'BRANDING', active: false },
      { id: 3, number: '03', name: 'VISUAL IDENTITY', active: false }
    ],
    // Categories for Project 2 - Season Future
    [
      { id: 1, number: '01', name: 'WEB DESIGN', active: true },
      { id: 2, number: '02', name: 'BRANDING', active: false },
      { id: 3, number: '03', name: 'UI/UX', active: false }
    ],
    // Categories for Project 3 - Digital Wallet
    [
      { id: 1, number: '01', name: 'BLOCKCHAIN', active: true },
      { id: 2, number: '02', name: 'UI/UX', active: false },
      { id: 3, number: '03', name: 'MOBILE APP', active: false }
    ]
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'NexoPay',
      image: 'images/work-1.jpg',
      tech: 'SEESO PRO TECHNOLOGY ALL-HKTVS',
      description: 'A modern payment solution platform designed for the future of digital transactions. Combining cutting-edge technology with user-centered design.',
      meta: [
        { label: 'CLIENT', value: 'NexoPay' },
        { label: 'YEAR', value: '2024' },
        { label: 'SERVICES', value: 'Brand Strategy, UI/UX' }
      ]
    },
    {
      id: 2,
      title: 'Season Future',
      image: 'images/work-2.jpg',
      tech: 'FUTURE PRO TECHNOLOGY',
      description: 'Innovative platform shaping the future of seasonal trends and forecasting. Advanced analytics meets intuitive design.',
      meta: [
        { label: 'CLIENT', value: 'Season Corp' },
        { label: 'YEAR', value: '2024' },
        { label: 'SERVICES', value: 'Web Design, Analytics' }
      ]
    },
    {
      id: 3,
      title: 'Digital Wallet',
      image: 'images/work-3.jpg',
      tech: 'BLOCKCHAIN INTEGRATION',
      description: 'Secure digital wallet solution with blockchain technology. Redefining how users manage their digital assets.',
      meta: [
        { label: 'CLIENT', value: 'CryptoFin' },
        { label: 'YEAR', value: '2024' },
        { label: 'SERVICES', value: 'Blockchain, UI/UX' }
      ]
    }
  ];

  get currentProject(): Project {
    return this.projects[this.currentIndex];
  }

  get currentCategories() {
    return this.categories[this.currentIndex];
  }

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextProject();
    }, 5000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  selectCategory(categoryId: number) {
    this.categories[this.currentIndex].forEach(cat => {
      cat.active = cat.id === categoryId;
    });
  }

  nextProject() {
    this.currentIndex = (this.currentIndex + 1) % this.projects.length;
    this.resetAutoSlide();
  }

  prevProject() {
    this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
    this.resetAutoSlide();
  }

  goToProject(index: number) {
    this.currentIndex = index;
    this.resetAutoSlide();
  }

  private resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  getCategoryDelay(index: number): number {
    return index * 100; // 100ms delay between each category
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.prevProject();
    } else if (event.key === 'ArrowRight') {
      this.nextProject();
    } else if (event.key >= '1' && event.key <= '3') {
      this.goToProject(parseInt(event.key) - 1);
    }
  }

  // Touch swipe support for mobile
  private touchStartX = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].screenX;
    const diff = this.touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        this.nextProject(); // Swipe left
      } else {
        this.prevProject(); // Swipe right
      }
    }
  }
}