// services-scroll.component.ts
import { Component, HostListener, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  mainImage: string;
  miniImage: string;
  bgImage: string;
}

@Component({
  selector: 'app-services-scroll',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pin-spacer" [style.height.px]="totalHeight">
      <section class="section-service-2 overflow-hidden flat-spacing" 
               #serviceSection
               [class.pinned]="isPinned"
               [style.transform]="sectionTransform">
        
        <!-- Background Images -->
        <div class="bg-image-list">
          <div *ngFor="let service of services; let i = index" 
               class="bg-image"
               [style.opacity]="currentServiceIndex === i ? 1 : 0">
            <img [src]="service.bgImage" alt="Background" loading="lazy">
            <div class="img-item">
              <img src="assets/images/item/overlay.png" alt="Overlay" loading="lazy">
            </div>
          </div>
        </div>

        <!-- Header -->
        <div class="container">
          <div class="s-header s-header-scroll">
            <div class="overflow-hidden">
              <h2 class="text-display-2 fw-semibold effectFade fadeUp">
                Services
              </h2>
            </div>
          </div>
        </div>

        <!-- Services Content -->
        <div class="container">
          <div class="wrap-control position-relative">
            <div *ngFor="let service of services; let i = index" 
                 class="wg-service-2"
                 [style.pointer-events]="currentServiceIndex === i ? 'auto' : 'none'"
                 [style.opacity]="getServiceOpacity(i)"
                 [style.transform]="getServiceTransform(i)">
              
              <!-- Main Image -->
              <div class="main-image">
                <div class="image">
                  <img [src]="service.mainImage" alt="Service" loading="lazy">
                </div>
                <div class="action tf-btn-2 cs-pointer">
                  <i class="icon icon-arrow-long-right"></i>
                </div>
              </div>

              <!-- Center Content -->
              <div class="center">
                <h5 class="title">{{ service.title }}</h5>
                <p class="desc">{{ service.description }}</p>
                <div class="br-line d-flex"></div>
                
                <ul class="tf-list vertical">
                  <li *ngFor="let feature of service.features" class="letter-space--1">
                    <span class="text-primary">//</span> {{ feature }}
                  </li>
                </ul>

                <a href="#contactScroll" class="tf-btn">START A PROJECT</a>
              </div>

              <!-- Mini Image -->
              <div class="image-simu"></div>
              <div class="image-2" 
                   [style.opacity]="getMiniImageOpacity(i)"
                   [style.left.px]="getMiniImageLeft(i)">
                <img [src]="service.miniImage" alt="Mini" loading="lazy">
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .pin-spacer {
      position: relative;
      width: 100%;
    }

    .section-service-2 {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      padding: 120px 0;
      transition: transform 0.1s linear;
    }

    .section-service-2.pinned {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
    }

    /* Background Images */
    .bg-image-list {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .bg-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: opacity 0.6s ease;
    }

    .bg-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .img-item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .img-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Container */
    .container {
      max-width: 1200px;
      margin: -37px auto;
      padding: 0 15px;
      position: relative;
      z-index: 2;
    }

    /* Header */


    .text-display-2 {
      font-size: 72px;
      font-weight: 600;
      color: #fff;
      margin: 0;
      line-height: 1.2;
    }

    .overflow-hidden {
      overflow: hidden;
    }

    /* Services Wrap */
    .wrap-control {
      position: relative;
      min-height: 600px;
    }

    .wg-service-2 {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      display: grid;
      grid-template-columns: 424px 1fr 212px;
      gap: 60px;
      align-items: center;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Main Image */
    .main-image {
      position: relative;
      width: 424px;
      height: 530px;
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.3s ease;
    }

    .main-image:hover {
      transform: scale(1.02);
    }

    .main-image .image {
      width: 100%;
      height: 100%;
    }

    .main-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .action {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .action:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.1);
    }

    .action i {
      font-size: 24px;
      color: #fff;
    }

    /* Center Content */
    .center {
      padding: 0 40px;
    }

    .title {
      font-size: 48px;
      font-weight: 700;
      color: #fff;
      line-height: 1.2;
    }

    .desc {
      font-size: 18px;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.7);
    }

    .br-line {
      width: 100%;
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
    }

    /* Features List */
    .tf-list {
      list-style: none;
      padding: 0;
    }

    .tf-list li {
      padding: 12px 0;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.8);
      letter-spacing: -0.5px;
    }

    .text-primary {
      color: #6366f1;
      margin-right: 8px;
    }

    /* Button */
    .tf-btn {
      display: inline-block;
      padding: 16px 40px;
      background: #6366f1;
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 1px;
      transition: all 0.3s ease;
    }

    .tf-btn:hover {
      background: #4f46e5;
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
    }

    /* Mini Image */
    .image-2 {
      position: absolute;
      width: 212px;
      height: 265px;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      top: 50%;
      transform: translateY(-50%);
    }

    .image-2 img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Responsive */
    @media (max-width: 1200px) {
      .wg-service-2 {
        grid-template-columns: 350px 1fr;
        gap: 40px;
      }

      .main-image {
        width: 350px;
        top:6%;
        height: 400px;
      }

      .image-2 {
        display: none;
      }
    }

    @media (max-width: 768px) {
      .text-display-2 {
        font-size: 48px;
      }

      .wg-service-2 {
        grid-template-columns: 1fr;
        gap: 30px;
      }

      .main-image {
        width: 100%;
        height: 400px;
      }

      .center {
        padding: 0;
      }

      .title {
        font-size: 36px;
      }

      .desc {
        font-size: 16px;
      }
    }
  `]
})
export class ServicesScrollComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild('serviceSection') serviceSection!: ElementRef;

  services: Service[] = [
    {
      id: 1,
      title: 'Branding',
      description: 'I create distinctive brand identities through strategy and visual design, helping businesses stand out, connect with audiences, and leave a lasting impression.',
      features: [
        'Brand Strategy',
        'Visual Identity Design',
        'Logo & Typography',
        'Color Palette Creation',
        'Brand Guidelines'
      ],
      mainImage: 'images/service-1.jpg',
      miniImage: 'images/service-2.jpg',
      bgImage: 'images/service-1.jpg'
    },
    {
      id: 2,
      title: 'Web Design',
      description: 'I design modern websites focused on user experience, scalability, and aesthetics. Each project is crafted to express the brand\'s identity and deliver lasting value.',
      features: [
        'UI/UX Design',
        'Responsive Layouts',
        'Interaction & Animation',
        'Accessibility Optimization',
        'Design Systems'
      ],
      mainImage: 'images/service-2.jpg',
      miniImage: 'images/service-3.jpg',
      bgImage: 'images/service-2.jpg'
    },
    {
      id: 3,
      title: 'No-Code Development',
      description: 'I build powerful websites using no-code platforms, ensuring fast deployment, easy management, and flexibility without compromising performance or security.',
      features: [
        'Framer Development',
        'Webflow Development',
        'CMS Setup & Integration',
        'SEO & Performance Optimization',
      ],
      mainImage: 'images/service-3.jpg',
      miniImage: 'images/service-3.jpg',
      bgImage: 'images/service-3.jpg'
    }
  ];

  currentServiceIndex = 0;
  isPinned = false;
  sectionTransform = '';
  totalHeight = 0;
  private sectionTop = 0;
  private sectionHeight = 0;
  private resizeObserver!: ResizeObserver;

  ngOnInit() {
    // Initialize with a reasonable default
    this.totalHeight = (window.innerHeight * this.services.length) - 55;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.calculateDimensions();
    });

    // Add resize observer to handle dynamic content changes
    this.resizeObserver = new ResizeObserver(() => {
      this.calculateDimensions();
    });

    if (this.serviceSection) {
      this.resizeObserver.observe(this.serviceSection.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateScrollAnimation();
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateDimensions();
  }

  private calculateDimensions() {
    if (!this.serviceSection) return;
    
    const section = this.serviceSection.nativeElement;
    const rect = section.getBoundingClientRect();
    this.sectionTop = window.scrollY + rect.top;
    this.sectionHeight = window.innerHeight;
    
    // Calculate total height based on number of services and viewport height
    this.totalHeight = (this.sectionHeight * this.services.length) + 50;
  }

  private updateScrollAnimation() {
    if (!this.serviceSection) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Check if section should be pinned
    const startPin = this.sectionTop;
    const endPin = this.sectionTop + this.totalHeight - windowHeight;

    if (scrollY >= startPin && scrollY <= endPin) {
      this.isPinned = true;
      this.sectionTransform = 'translate(0px, 0px)';
      
      // Calculate progress through pinned section
      const progress = (scrollY - startPin) / (this.totalHeight - windowHeight);
      const serviceProgress = progress * this.services.length;
      this.currentServiceIndex = Math.min(
        Math.floor(serviceProgress),
        this.services.length - 1
      );
    } else if (scrollY < startPin) {
      this.isPinned = false;
      this.sectionTransform = '';
      this.currentServiceIndex = 0;
    } else {
      this.isPinned = false;
      const offset = scrollY - endPin;
      this.sectionTransform = `translate(0px, ${offset}px)`;
      this.currentServiceIndex = this.services.length - 1;
    }
  }

  getServiceOpacity(index: number): number {
    if (index === this.currentServiceIndex) return 1;
    if (index === this.currentServiceIndex - 1) return 0;
    if (index === this.currentServiceIndex + 1) return 0;
    return 0;
  }

  getServiceTransform(index: number): string {
    if (index === this.currentServiceIndex) {
      return 'translate(0px, 0px) scale(1, 1)';
    }
    if (index < this.currentServiceIndex) {
      return 'translate(0px, 0px) scale(1, 1)';
    }
    return 'scale(0.95, 0.95)';
  }

  getMiniImageOpacity(index: number): number {
    return index === this.currentServiceIndex ? 1 : 0;
  }

  getMiniImageLeft(index: number): number {
    if (index !== this.currentServiceIndex) return 0;
    return 1084; // Position on right side
  }
}