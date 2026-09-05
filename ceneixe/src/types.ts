export interface ServiceItem {
  id: string;
  title: string;
  category: 'sastreria' | 'arreglos' | 'fiesta' | 'transformacion' | 'hogar';
  description: string;
  timeEstimate: string;
  basePrice: number;
  features: string[];
  popular?: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'sastreria' | 'fiesta' | 'arreglos' | 'transformacion';
  tag: string;
  description: string;
  details: string[];
  beforeImage: string;
  afterImage: string;
  clientNote?: string;
  completionTime: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  service: string;
  comment: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'citas' | 'precios' | 'tiempos' | 'proceso';
}

export interface AppointmentFormData {
  fullName: string;
  phone: string;
  email: string;
  garmentType: string;
  serviceType: string;
  urgency: 'normal' | 'express';
  preferredDate: string;
  preferredTime: string;
  notes: string;
  hasPhoto?: boolean;
}
