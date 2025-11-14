// faq-section.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  number: string;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq-section.html',
  styleUrls: ['./faq-section.scss']
})
export class FaqSectionComponent {
  faqItems: FAQItem[] = [
    {
      number: '01',
      question: 'How long does a project usually take?',
      answer: 'The timeline varies depending on the project scope and complexity. Typically, a complete website project takes 6-8 weeks from initial consultation to launch. This includes discovery, design, development, testing, and deployment phases.',
      isOpen: false // افتح أول واحد
    },
    {
      number: '02',
      question: 'Do you work with international clients?',
      answer: 'Yes, absolutely! We work with clients worldwide. We\'re experienced in remote collaboration across different time zones and can accommodate various communication preferences including video calls, email, and project management tools.',
      isOpen: false // افتح التاني
    },
    {
      number: '03',
      question: 'Can you help with both design and development?',
      answer: 'Yes, we offer full-service design and development. Our team includes skilled UI/UX designers who create beautiful, user-friendly interfaces, and experienced developers who bring those designs to life with clean, efficient code.',
      isOpen: false // افتح التالت
    },
    {
      number: '04',
      question: 'What\'s your payment process?',
      answer: 'We use a structured payment process to ensure transparency and mutual commitment. The project is divided into milestones with payments due at each stage completion.',
      isOpen: false // افتح الرابع
    },
    {
      number: '05',
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes, we offer comprehensive post-launch support packages. This includes technical maintenance, security updates, performance optimization, and content updates. We ensure your website continues to perform optimally long after launch.',
      isOpen: false // افتح الخامس
    }
  ];

  toggleFAQ(index: number) {
    // بس افتح أو اقفل الـ FAQ اللي دوس عليه بدون ما تغير الباقي
    this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
  }

  // دالة جديدة لفتح كل الـ FAQs
  openAllFAQs() {
    this.faqItems.forEach(item => {
      item.isOpen = true;
    });
  }

  // دالة جديدة لقفل كل الـ FAQs
  closeAllFAQs() {
    this.faqItems.forEach(item => {
      item.isOpen = false;
    });
  }

  scrollToContact(event: Event) {
    event.preventDefault();
    const element = document.getElementById('contactScroll');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.animateOnScroll();
  }

  private animateOnScroll() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      if (itemTop < window.innerHeight - 100) {
        item.classList.add('animate-in');
      }
    });
  }
}