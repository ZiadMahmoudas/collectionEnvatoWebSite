// pricing-made-easy.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PricingPlan {
  monthly: number;
  yearly: number;
}

@Component({
  selector: 'app-pricing-made-easy',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pricing-made-easy.html',
  styleUrls: ['./pricing-made-easy.scss']
})
export class PricingMadeEasyComponent implements OnInit {
  hoveredCard: number | null = null;
  selectedBilling: 'monthly' | 'yearly' = 'monthly';
  showBillingOptions = false;

  // Pricing plans with monthly and yearly prices
  pricingPlans = {
    basic: { monthly: 640, yearly: 6144 }, // 20% discount yearly
    pro: { monthly: 1280, yearly: 12288 }, // 20% discount yearly
    enterprise: { monthly: 2560, yearly: 24576 } // 20% discount yearly
  };

  ngOnInit() {
    // Show billing options after a short delay
    setTimeout(() => {
      this.showBillingOptions = true;
    }, 500);
  }

  onCardHover(index: number) {
    this.hoveredCard = index;
  }

  onCardLeave(index: number) {
    this.hoveredCard = null;
  }

  onBillingChange() {
    // You can add any additional logic when billing changes
    console.log('Billing changed to:', this.selectedBilling);
  }

  getPrice(plan: keyof typeof this.pricingPlans): string {
    const price = this.pricingPlans[plan][this.selectedBilling];
    return `$${price.toLocaleString()}`;
  }

  selectPlan(planType: string) {
    console.log('Selected plan:', planType, 'Billing:', this.selectedBilling);
    // هنا تضيف الـ logic بتاعت اختيار الباقة
  }

  @HostListener('window:scroll')
  onScroll() {
    this.animateOnScroll();
  }

  private animateOnScroll() {
    const cards = document.querySelectorAll('.pricing-card');
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < window.innerHeight - 100) {
        card.classList.add('animate-in');
      }
    });
  }
}