import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DaviesPortfolioComponent } from "./pages/davies-portfolio-component/davies-portfolio-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DaviesPortfolioComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'collectionEnvatoWebSite';
  mouseX = 0;
  mouseY = 0;
  private trailDots: Array<{x: number, y: number, age: number}> = [];

  ngOnInit() {
    this.initCursorTrail();
    this.initScrollTop();
      const lenis = new (window as any).Lenis({
      duration: 1.2, // مدة التمرير
      easing: 'ease', // تأثير التمرير
      smoothWheel: true, // التمرير باستخدام عجلة الفأرة
      smoothTouch: true, // التمرير باستخدام اللمس
    });

    function animate(time:any) {
      lenis.raf(time);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.toggleScrollTop();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    
    // Add white trail dot
    this.trailDots.push({
      x: event.clientX,
      y: event.clientY,
      age: 0
    });
    
    // Keep only last 15 dots for smooth trail
    if (this.trailDots.length > 15) {
      this.trailDots.shift();
    }
  }

  private initCursorTrail() {
    // Wait for DOM to be ready
    setTimeout(() => {
      const canvas = document.getElementById('trail') as HTMLCanvasElement;
      if (!canvas) {
        console.error('Canvas element not found!');
        return;
      }

      // Force canvas visibility
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '99999';
      canvas.style.display = 'block';

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('Canvas context not available!');
        return;
      }

      // Set canvas size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      console.log('Canvas initialized:', canvas.width, canvas.height);
      
      // Handle window resize
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw white curved trail
        if (this.trailDots.length > 1) {
          ctx.beginPath();
          ctx.moveTo(this.trailDots[0].x, this.trailDots[0].y);
          
          // Draw smooth curve through points
          for (let i = 1; i < this.trailDots.length - 1; i++) {
            const xc = (this.trailDots[i].x + this.trailDots[i + 1].x) / 2;
            const yc = (this.trailDots[i].y + this.trailDots[i + 1].y) / 2;
            ctx.quadraticCurveTo(this.trailDots[i].x, this.trailDots[i].y, xc, yc);
          }
          
          // Draw last point
          if (this.trailDots.length > 0) {
            const last = this.trailDots[this.trailDots.length - 1];
            ctx.lineTo(last.x, last.y);
          }
          
          // Style the trail - INCREASED VISIBILITY
          ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
          ctx.stroke();
          
          // Draw dots along the trail with fade effect
          for (let i = 0; i < this.trailDots.length; i++) {
            const dot = this.trailDots[i];
            const opacity = (i / this.trailDots.length) * 0.8;
            const size = 4 + (i / this.trailDots.length) * 3;
            
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
            ctx.fill();
          }
        }
        
        // Age dots
        this.trailDots.forEach(dot => dot.age++);
        
        // Remove old dots
        this.trailDots = this.trailDots.filter(dot => dot.age < 30);

        requestAnimationFrame(animate);
      };

      animate();
    }, 100);
  }

  private createClickIndicator(event: MouseEvent) {
    const indicator = document.createElement('div');
    indicator.className = 'click-indicator';
    indicator.style.left = event.clientX + 'px';
    indicator.style.top = event.clientY + 'px';
    
    const outerCircle = document.createElement('div');
    outerCircle.className = 'indicator-outer-circle';
    
    const middleCircle = document.createElement('div');
    middleCircle.className = 'indicator-middle-circle';
    
    const innerDot = document.createElement('div');
    innerDot.className = 'indicator-inner-dot';
    
    const horizontalLine = document.createElement('div');
    horizontalLine.className = 'indicator-line-horizontal';
    
    indicator.appendChild(outerCircle);
    indicator.appendChild(middleCircle);
    indicator.appendChild(innerDot);
    indicator.appendChild(horizontalLine);
    document.body.appendChild(indicator);

    setTimeout(() => {
      indicator.remove();
    }, 1000);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.createClickIndicator(event);
  }

  private initScrollTop() {
    this.toggleScrollTop();
  }

  private toggleScrollTop() {
    const goTop = document.getElementById('goTop');
    if (goTop) {
      if (window.pageYOffset > 300) {
        goTop.classList.add('show');
      } else {
        goTop.classList.remove('show');
      }
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}