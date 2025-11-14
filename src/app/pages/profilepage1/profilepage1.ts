import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsMarqueeComponent } from '../sections/app-skills-section/app-skills-section';
import { ServicesScrollComponent } from "../sections/services-scroll/services-scroll";
import { PricingMadeEasyComponent } from "../sections/pricing-made-easy/pricing-made-easy";
import { FeaturedTemplatesComponent } from "../sections/featured-templates/featured-templates";
import { FaqSectionComponent } from "../sections/faq-section/faq-section";
import { ContactSectionComponent } from "../sections/contact-section/contact-section";
import { SelectedWorksComponent } from "../sections/selected-works/selected-works";

interface MenuItem {
  number: string;
  name: string;
  section: string;
  scrollText: string;
}

interface Dot {
  x: number;
  y: number;
  size: number;
  life: number;
}

@Component({
  selector: 'app-profilepage',
  standalone: true,
  imports: [CommonModule, SkillsMarqueeComponent, ServicesScrollComponent, PricingMadeEasyComponent, FeaturedTemplatesComponent, FaqSectionComponent, ContactSectionComponent, SelectedWorksComponent],
  templateUrl: './profilepage1.html',
  styleUrls: ['./profilepage1.scss']
})
export class ProfilePage1 implements OnInit, OnDestroy {
  // Menu Items - مصدر واحد لكل القوائم
    isLogoHovered = false;

  onLogoHover() {
    this.isLogoHovered = true;
  }

  onLogoLeave() {
    this.isLogoHovered = false;
  }
  menuItems: MenuItem[] = [
    { number: '01', name: 'WORKS', section: 'workScroll', scrollText: 'VIEW WORKS' },
    { number: '02', name: 'SKILLS', section: 'skillsScroll', scrollText: 'VIEW SKILLS' },
    { number: '03', name: 'SERVICES', section: 'serviceScroll', scrollText: 'VIEW SERVICES' },
    { number: '04', name: 'ABOUT', section: 'aboutScroll', scrollText: 'VIEW ABOUT' },
    { number: '05', name: 'CONTACT', section: 'contactScroll', scrollText: 'VIEW CONTACT' }
  ];

  // استخدم نفس menuItems للموبايل
  get mobileMenuItems(): MenuItem[] {
    return this.menuItems;
  }
webDesignFeatures = [
    'UI/UX Design',
    'Responsive Layouts', 
    'Interaction & Animation',
    'Accessibility Optimization',
    'Design Systems'
  ];

  serviceStats = [
    { number: '1', label: 'Revenue of respondents' },
    { number: '2', label: 'Sex' },
    { number: '3', label: 'Source' }
  ];

  additionalServices = [
    {
      title: 'Brand Strategy',
      description: 'Developing cohesive brand identities that communicate your values and vision.'
    },
    {
      title: 'Product Design', 
      description: 'Creating intuitive digital products that solve real user problems.'
    },
    {
      title: 'Development',
      description: 'Bringing designs to life with clean, efficient, and modern code.'
    }
  ];

  // Testimonials Data
 testimonials = [
    {
      name: 'Ethan Novales',
      position: 'Hickering Director, Horizon Against',
      text: 'Imagined our digital presence. The site is striking, fast, and engaging visitors while clearly expressing our brand.',
      image: 'images/tes-1.jpg', // صورة خلفية واضحة
      avatar: 'images/tes-1.jpg'
    },
    {
      name: 'Liam Carter', 
      position: 'Founder, Arcadia Tech',
      text: 'Working with Ziad was seamless. He nailed our vision and delivered a modern, functional website that feels distinctly ours.',
      image: 'images/tes-2.jpg',
      avatar: 'images/tes-2.jpg'
    },
    {
      name: 'Seth Carson',
      position: 'Product Manager, Lauren Studio', 
      text: 'From first concept to launch, Ziad exceeded expected choice was intentional, making our platform beautiful and a pleasure to use.',
      image: 'images/tes-3.jpg',
      avatar: 'images/tes-3.jpg'
    }
  ];
  currentTestimonial = 0;

  nextTestimonial() {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    this.resetAutoPlay();
  }
  parallaxOffset = 0;
  private autoPlayInterval: any;
  private isScrolling = false;
  prevTestimonial() {
    this.currentTestimonial = this.currentTestimonial === 0 ? 
      this.testimonials.length - 1 : this.currentTestimonial - 1;
    this.resetAutoPlay();
  }
    private resetAutoPlay() {
    // Reset auto-play timer when user interacts
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
    
    this.autoPlayInterval = setInterval(() => {
      if (!this.isScrolling) {
        this.nextTestimonial();
      }
    }, 5000);
  }

  goToTestimonial(index: number) {
    this.currentTestimonial = index;
  }

  // Scroll Animation Logic
  @HostListener('window:scroll', [])
  onScroll() {
    this.animateOnScroll();
  }

  private animateOnScroll() {
    const elements = document.querySelectorAll('.testimonial-card, .service-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }
  // Header State
  isScrolled = false;
  isMenuHovered = false;
  mobileMenuOpen = false;
  currentTime = '';
  hoveredMenuItem: string | null = null;
  showScrollTop = false;

  // Cursor Trail
  private mouseX = 0;
  private mouseY = 0;
  private dots: Dot[] = [];
  private animationFrameId: number | null = null;
  private timeInterval: any;

  ngOnInit() {
     this.updateTime();
    this.timeInterval = setInterval(() => this.updateTime(), 1000);
    this.initCursorTrail();
    this.initHeroAnimations();
    this.initTestimonials();
  }
  private initTestimonials() {
    // Auto-play
    this.autoPlayInterval = setInterval(() => {
      if (!this.isScrolling) {
        this.nextTestimonial();
      }
    }, 5000);

    // Keyboard navigation
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    
    // Parallax effect
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }
  ngOnDestroy() {
    if (this.timeInterval) clearInterval(this.timeInterval);
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.autoPlayInterval) clearInterval(this.autoPlayInterval);
    document.body.style.overflow = '';
    
    // إزالة event listeners
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }
    private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.prevTestimonial();
    } else if (event.key === 'ArrowRight') {
      this.nextTestimonial();
    } else if (event.key >= '1' && event.key <= '3') {
      this.goToTestimonial(parseInt(event.key) - 1);
    }
  }

  private handleScroll() {
    // Parallax effect based on scroll
    const scrollY = window.scrollY;
    const testimonialsSection = document.getElementById('testimonialsScroll');
    
    if (testimonialsSection) {
      const sectionTop = testimonialsSection.offsetTop;
      const sectionHeight = testimonialsSection.offsetHeight;
      const scrollPercent = (scrollY - sectionTop) / sectionHeight;
      
      this.parallaxOffset = scrollPercent * 100; // Adjust parallax intensity
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 100;
    this.showScrollTop = scrollPosition > 300;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.createClickEffect(event);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  // Menu Methods
  onMenuHover(isHovered: boolean) {
    this.isMenuHovered = isHovered;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  setMenuHover(section: string) {
    this.hoveredMenuItem = section;
  }

  clearMenuHover() {
    this.hoveredMenuItem = null;
  }

  // Scroll Methods
  scrollToTop(event?: Event) {
    event?.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  scrollToSection(sectionId: string, event: Event) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    if (this.mobileMenuOpen) this.toggleMobileMenu();
  }

  // Private Methods
  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
  }

  private initCursorTrail() {
    const canvas = document.getElementById('trail') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (this.mouseX > 0 && this.mouseY > 0) {
        this.dots.push({
          x: this.mouseX,
          y: this.mouseY,
          size: Math.random() * 4 + 2,
          life: 1
        });
      }

      for (let i = this.dots.length - 1; i >= 0; i--) {
        const dot = this.dots[i];
        dot.life -= 0.02;
        
        if (dot.life <= 0) {
          this.dots.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * dot.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(7, 196, 44, ${dot.life * 0.3})`;
        ctx.fill();
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  private createClickEffect(event: MouseEvent) {
    const effect = document.createElement('div');
    effect.className = 'click-effect';
    effect.style.left = `${event.clientX - 20}px`;
    effect.style.top = `${event.clientY - 20}px`;
    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 600);
  }

  private initHeroAnimations() {
    setTimeout(() => {
      const elements = document.querySelectorAll('.effectFade');
      elements.forEach((el, index) => {
        setTimeout(() => el.classList.add('animate-in'), index * 200);
      });
    }, 500);
  }
  
}