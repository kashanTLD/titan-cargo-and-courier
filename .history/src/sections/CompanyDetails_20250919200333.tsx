import React from 'react';
import Image from "next/image";
import { CompanyDetailsContent, Image as ImageType } from '@/types/template';

interface CompanyDetailsProps {
  data: CompanyDetailsContent;
  images?: ImageType[];
  theme?: {
    primaryColor: string;
    secondaryColor: string;
  };
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ data, images, theme }) => {
  if (!data || !data.sections || data.sections.length === 0) {
    return null;
  }
  

  // Helper function to get image by slot name
  const getImageBySlot = (slotName: string) => {
    return images?.find(img => img.slotName === slotName);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading and description */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            {data.heading}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {data.description}
          </p>
        </div>
        
        {/* Sections grid */}
        <div className="">
          {data.sections.map((section, index) => {
            const sectionImage = getImageBySlot(`companyDetails-image-${index + 1}`);
            console.log(sectionImage);
            
            return (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} md:h-[500px] items-center`}
              >
                {/* Section Image */}
                {sectionImage && (
                  <div className="flex-1">
                   <div className='relative group'>
                   <div
  className="absolute inset-0 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"
  style={{
    background: theme
      ? `linear-gradient(135deg, 
          ${theme.primaryColor}33, 
          ${theme.secondaryColor}33, 
          #000000ff
        )`
      : "#1f2937",
  }}
  
></div>

                    <Image 
                      src={sectionImage.imageUrl} 
                      alt={sectionImage.altText || section.heading}
                      width={600}
                      height={320}
                      className="relative w-full h-80 object-cover rounded-3xl shadow-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-300"
                loading="lazy"
                    />
                   </div>
                  </div>
                )}
                
                {/* Section Content */}
                <div className="flex-1 p-4 sm:p-6 md:p-8">
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    {section.heading}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                    {section.description}
                  </p>
                </div>
               
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CompanyDetails;