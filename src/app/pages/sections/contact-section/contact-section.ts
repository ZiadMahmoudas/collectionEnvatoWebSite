// contact-section.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-section.html',
  styleUrls: ['./contact-section.scss']
})
export class ContactSectionComponent {
  isSelectOpen = false;
  isSubmitting = false;
  selectedService: string = '';
  
  formData = {
    name: '',
    email: '',
    budget: '',
    message: ''
  };

  services = [
    'Web Development',
    'UI/UX Design',
    'Digital Marketing',
    'Brand Strategy',
    'E-commerce Solutions',
    'Consultation'
  ];

  onInputFocus(event: any) {
    const input = event.target;
    input.parentElement.classList.add('focused');
  }

  onInputBlur(event: any) {
    const input = event.target;
    if (!input.value) {
      input.parentElement.classList.remove('focused');
    }
  }

  toggleSelect() {
    this.isSelectOpen = !this.isSelectOpen;
  }

  onSelectBlur() {
    setTimeout(() => {
      this.isSelectOpen = false;
    }, 200);
  }

  selectService(service: string) {
    this.selectedService = service;
    this.isSelectOpen = false;
  }

  onSubmit() {
    if (!this.formData.name) {
      return;
    }

    this.isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', { ...this.formData, service: this.selectedService });
      this.isSubmitting = false;
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        budget: '',
        message: ''
      };
      this.selectedService = '';
      
      // Show success message
      alert('Thank you for your message! We\'ll get back to you soon.');
    }, 2000);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-select')) {
      this.isSelectOpen = false;
    }
  }

  @HostListener('window:keydown.escape')
  onEscapePress() {
    this.isSelectOpen = false;
  }
}