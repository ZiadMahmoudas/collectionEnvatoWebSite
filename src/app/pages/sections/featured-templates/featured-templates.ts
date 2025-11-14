// featured-templates.component.ts
import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Template {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  hoverImage?: string;
}

@Component({
  selector: 'app-featured-templates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-templates.html', // خليها كده بس
  styleUrls: ['./featured-templates.scss']
})
export class FeaturedTemplatesComponent implements OnInit, OnDestroy {
  hoveredId: number | null = null;
  currentIndex = 0;
  visibleCards = 2;
  slideWidth = 50; // 50% for 2 cards
  isMobile = false;
  cursorPosition: { [key: number]: { x: number, y: number } } = {};
  private touchStartX = 0;
  private touchEndX = 0;

  templates: Template[] = [
    {
      id: 1,
      title: 'Portz',
      category: 'Portfolio',
      price: 49,
      image: 'images/feature-2.jpg'
    },
    {
      id: 2,
      title: 'Agenz',
      category: 'Agency',
      price: 49,
      image: 'images/feature-1.jpg'
    },
    {
      id: 3,
      title: 'Minimal',
      category: 'Portfolio',
      price: 39,
      image: 'images/feature-2.jpg'
    },
  ];

  ngOnInit() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkMobile.bind(this));
  }

  checkMobile() {
    this.isMobile = window.innerWidth <= 768;
    this.visibleCards = this.isMobile ? 1 : 2;
    this.slideWidth = 100 / this.visibleCards;
  }

  get maxIndex(): number {
    return Math.max(0, this.templates.length - this.visibleCards);
  }

  getDots(): number[] {
    return Array.from({ length: this.maxIndex + 1 }, (_, i) => i);
  }

  onHover(id: number) {
    if (!this.isMobile) {
      this.hoveredId = id;
    }
  }

  onLeave(id: number) {
    if (!this.isMobile) {
      this.hoveredId = null;
      delete this.cursorPosition[id];
    }
  }

  onMouseMove(event: MouseEvent, id: number) {
    if (!this.isMobile) {
      const target = event.currentTarget as HTMLElement;
      const rect = target.querySelector('.template-image')?.getBoundingClientRect();
      
      if (rect) {
        this.cursorPosition[id] = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      }
    }
  }

  // Touch events for mobile swipe
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next(); // Swipe left
      } else {
        this.prev(); // Swipe right
      }
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    }
  }

  goToSlide(index: number) {
    this.currentIndex = index;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'ArrowRight') {
      this.next();
    }
  }
}