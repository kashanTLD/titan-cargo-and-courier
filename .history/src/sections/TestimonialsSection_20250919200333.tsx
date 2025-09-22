interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: Testimonial[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  company: string;
}

export default function TestimonialsSection({ title, description, testimonials, theme }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden" style={{
      background: theme ? `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})` : 'linear-gradient(135deg, #000, #666)'
    }}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-3 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/95 backdrop-blur-sm p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white border border-white/20"
            >
              <div className="flex items-start mb-6">
                <div className="flex-shrink-0">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-gray-50 bg-black`}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm font-medium" style={{
                    color: theme?.primaryColor || '#000'
                  }}>
                    {testimonial.company}
                  </p>
                </div>
              </div>
              
              <blockquote className="text-gray-700 italic leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              
              <div className="flex mt-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    style={{ color: theme?.primaryColor || '#000' }}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
