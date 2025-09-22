// TypeScript interfaces matching the actual database schema

// Basic types for CTA buttons and common elements
export interface CtaButton {
  label: string;
  href: string;
}

// Image interface matching database structure
export interface Image {
  id: string;
  landingPageId: string;
  title: string;
  altText: string;
  imageUrl: string;
  slotName: string;
  category: string;
  createdAt: string;
}

// Hero section content structure
export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  ctaButton?: CtaButton;
}

// About section content structure
export interface AboutContent {
  title: string;
  description: string;
  features: string[];
  ctaButton?: CtaButton;
}

// Service structure
export interface Service {
  name: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  ctaButton?: CtaButton;
}

// Services section content structure
export interface ServicesContent {
  title: string;
  description: string;
  services: Service[];
}

// Testimonial structure
export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  role: string;
  company: string;
}

// Testimonials section content structure
export interface TestimonialsContent {
  title: string;
  description: string;
  testimonials: Testimonial[];
}

// Gallery section content structure
export interface GalleryContent {
  title: string;
  description: string;
}

// FAQ item structure
export interface FAQItem {
  question: string;
  answer: string;
}

// FAQ section content structure
export interface FAQContent {
  title: string;
  description: string;
  questions: FAQItem[];
}

// Business overview content structure
export interface BusinessOverviewContent {
  content: Array<{
    heading: string;
    description: string;
    ctaButton: CtaButton;
  }>;
}

// Company details section structure
export interface CompanyDetailsContent {
  heading: string;
  description: string;
  sections: Array<{
    heading: string;
    description: string;
  }>;
}

// Footer content structure
export interface FooterContent {
  copyright: string;
}

// Contact content structure
export interface ContactContent {
  title: string;
  description: string;
  showMap: boolean;
}

// Service highlights content structure
export interface ServiceHighlightsContent {
  title: string;
  description: string;
  services: Array<{
    name: string;
    description: string;
  }>;
}

// CTA section content structure
export interface CTAContent {
  heading: string;
  subHeading: string;
  description: string;
  ctaButton: CtaButton;
}

// Main content structure (JSONB field)
export interface ContentData {
  hero?: HeroContent;
  about?: AboutContent;
  services?: ServicesContent;
  testimonials?: TestimonialsContent;
  gallery?: GalleryContent;
  faq?: FAQContent;
  businessOverview?: BusinessOverviewContent;
  companyDetails?: CompanyDetailsContent;
  footer?: FooterContent;
  contact?: ContactContent;
  serviceHighlights?: ServiceHighlightsContent;
  ctaSection?: CTAContent;
}

// SEO data structure (JSONB field)
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  isIndex: boolean;
  canonicalUrl: string;
  focusedKeywords?: string[];
}

// Theme data structure (JSONB field)
export interface ThemeData {
  primaryColor: string;
  secondaryColor: string;
  accentColor?: string;
}

// Address structure
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

// Social link structure
export interface SocialLink {
  platform: string;
  url: string;
}

// Service area structure
export interface ServiceArea {
  city: string;
  region: string;
  description: string;
}

// Business data structure (JSONB field)
export interface BusinessData {
  email: string;
  phone: string;
  emergencyPhone?: string;
  emergencyEmail?: string;
  address: Address;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  socialLinks: SocialLink[];
  serviceAreas: ServiceArea[];
  businessHours?: Array<{
    day: string;
    hours: string;
    isClosed: boolean;
  }>;
}

// Main landing page interface matching database structure
export interface LandingPageData {
  id: string;
  templateId: string;
  businessName: string;
  githubUrl?: string;
  status: string;
  content: ContentData;
  seoData: SEOData;
  themeData: ThemeData;
  businessData: BusinessData;
  companyDetails: CompanyDetailsContent;
  serviceHighlights?: ServiceHighlightsContent;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  images?: Image[];
}

// Legacy interface for backward compatibility
export interface TemplateData extends LandingPageData {
  sections?: Array<Record<string, unknown>>;
}
