'use client';

import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLandingPageData } from '@/components/LandingPageDataProvider';
import { useParams } from 'next/navigation';

export default function ServicesFAQSection() {
  const landingPageData = useLandingPageData();
  const { id } = useParams<{ id: string }>();

  // Helpers
  const toSlug = (str: string) =>
    String(str || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  // Locate the current service (by numeric id or slug) to align FAQs
  const services: unknown[] = Array.isArray(landingPageData.content?.services?.services)
    ? (landingPageData.content.services.services as unknown[])
    : [];
  const matchIndex = services.findIndex((s: unknown, idx: number) => {
    const obj = (s || {}) as Record<string, unknown>;
    const sid = String((obj.id as string | number | undefined) ?? '');
    const title = typeof obj.title === 'string' ? obj.title : undefined;
    const name = typeof obj.name === 'string' ? obj.name : undefined;
    const slug = toSlug(String(name ?? title ?? `service-${idx + 1}`));
    return sid === id || slug === id;
  });

  const service = matchIndex >= 0 ? (services[matchIndex] as Record<string, unknown>) : undefined;
  const titleText = String(
    (service?.title as string | undefined) ??
      (service?.name as string | undefined) ??
      (matchIndex >= 0 ? `Service ${matchIndex + 1}` : 'Service')
  );

  // Pull servicesDetails and match the corresponding detail item
  const detailsList: Array<{ title?: string; content?: { description?: string; sections?: Array<{ title?: string; text?: string }>; faqs?: string[] } }>
    = Array.isArray(landingPageData.content?.servicesDetails?.servicesDetails)
      ? (landingPageData.content.servicesDetails.servicesDetails as Array<{ title?: string; content?: { description?: string; sections?: Array<{ title?: string; text?: string }>; faqs?: string[] } }>)
      : [];

  const currentSlug = toSlug(titleText || '');
  const detailMatch = (() => {
    // 1) Exact slug match or substring overlap
    const exact = detailsList.find((d) => {
      const ds = toSlug(String(d?.title || ''));
      return ds === currentSlug || (ds && currentSlug && (ds.includes(currentSlug) || currentSlug.includes(ds)));
    });
    if (exact) return exact;
    // 2) Fallback by index alignment
    if (matchIndex >= 0 && matchIndex < detailsList.length) return detailsList[matchIndex];
    return undefined;
  })();

  const faqs: string[] = Array.isArray(detailMatch?.content?.faqs)
    ? (detailMatch!.content!.faqs!.filter((f): f is string => typeof f === 'string' && f.trim() !== ''))
    : [];

  // Transform string FAQs into question/answer pairs for this component's UI
  type QA = { question: string; answer: string };
  const parseFAQ = (s: string): QA => {
    const qIdx = s.indexOf('?');
    if (qIdx !== -1) {
      const q = s.slice(0, qIdx + 1).trim();
      const a = s.slice(qIdx + 1).trim();
      return { question: q || 'Question', answer: a || s };
    }
    // No '?': use first sentence as question if possible
    const periodIdx = s.indexOf('.');
    if (periodIdx !== -1 && periodIdx < 120) {
      const q = s.slice(0, periodIdx + 1).trim();
      const a = s.slice(periodIdx + 1).trim();
      return { question: q || 'Question', answer: a || s };
    }
    // Fallback: treat full as answer with a generic question
    return { question: 'Frequently asked question', answer: s };
  };

  const questions: QA[] = faqs.map(parseFAQ);
  const title = `${titleText} FAQs`;
  const description = '';
  const themeData = landingPageData.themeData;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.3 });
  const { ref: descriptionRef, isVisible: descriptionVisible } = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.3 });

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const primaryColor = themeData?.primaryColor || '#6366f1';
  const secondaryColor = themeData?.secondaryColor || '#8b5cf6';

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 lg:py-32 relative overflow-hidden bg-gray-50"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${primaryColor}, transparent 70%)`,
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${secondaryColor}, transparent 70%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div 
              className={`transition-all duration-1000 ease-out ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
              >
                {title}
              </h2>
            </div>
            
            <p 
              ref={descriptionRef}
              className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
                descriptionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {description}
            </p>
          </div>

          {/* FAQ Questions */}
          <div className="space-y-4 mb-12">
            {questions?.map((faq, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden transition-all duration-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: `${index * 0.1}s`
                }}
              >
                <button
                  className={`w-full px-6 py-4 text-left flex justify-between items-center transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-gray-800 text-white shadow-lg' 
                      : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                  }`}
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  style={{
                    background: openIndex === index 
                      ? `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` 
                      : '#374151'
                  }}
                  onMouseEnter={(e) => {
                    if (openIndex !== index) {
                      e.currentTarget.style.background = '#4B5563';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (openIndex !== index) {
                      e.currentTarget.style.background = '#374151';
                    }
                  }}
                >
                  <span className="font-medium text-base pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                </button>
                
                <div 
                  id={`faq-answer-${index}`}
                  className="overflow-hidden transition-all duration-500 ease-in-out bg-white"
                  style={{
                    maxHeight: openIndex === index ? '500px' : '0px',
                    opacity: openIndex === index ? 1 : 0,
                  }}
                >
                  <div className="px-6 py-5 border-l-4 border-gray-200">
                    <p className="text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ 
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease, transform 0.8s ease',
              transitionDelay: '0.8s'
            }}
          >
            
            <button 
              className="px-8 py-3 font-medium text-white rounded-lg transition-all duration-300 hover:shadow-lg">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}