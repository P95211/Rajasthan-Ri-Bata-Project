import { useState, useEffect, useCallback } from 'react';

const heroItems = [
  {
    type: 'image',
    src: "/uploads/e1e89f63-9f0b-49ee-99a5-7e5c2b33bbe2.png",
    alt: "Traditional Rajasthani pottery artist",
    title: "Heritage Crafts",
    description: "Discover the timeless art of traditional Rajasthani pottery"
  },
  {
    type: 'image',
    src: "/uploads/0d41d6fb-ad36-46bb-96ca-443865379236.png", 
    alt: "Traditional Rajasthani musician",
    title: "Folk Music",
    description: "Experience the soul of Rajasthan through traditional music"
  },
  {
    type: 'image',
    src: "/uploads/0c9e8137-4b9b-4f26-8ebf-97915e631765.png",
    alt: "Vibrant Rajasthani market",
    title: "Cultural Markets", 
    description: "Explore the colorful bazaars and rich traditions"
  },
  {
    type: 'image',
    src: "/uploads/6a6a729e-c3cb-4a29-9161-ded84a906e81.png",
    alt: "Majestic Rajasthani palace",
    title: "Royal Architecture",
    description: "Witness the grandeur of Rajasthani palaces and forts"
  },
  {
    type: 'image',
    src: "/uploads/f455efeb-fc3c-47d3-9de7-5e0069647ddb.png",
    alt: "Thar desert with camel caravan",
    title: "Desert Life",
    description: "Journey through the golden sands of the Thar Desert"
  }
];

export const HeroCarousel = ({ showTextOverlay = false, children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Preload first image
    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = heroItems[0].src;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroItems.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroItems.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroItems.length) % heroItems.length);
  }, []);

  const currentItem = heroItems[currentSlide];

  return (
    <div className="relative w-screen h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden -mx-4 md:-mx-6 lg:-mx-8">
      {/* Media Container */}
      <div className="absolute inset-0">
        {heroItems.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={index === 0 ? "high" : "low"}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col">
        {children}
        
        {showTextOverlay && (
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
            <div className="max-w-2xl">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 lg:mb-3 animate-fade-in font-royal text-shadow-lg">
                {currentItem.title}
              </h3>
              <p className="text-sm md:text-base lg:text-lg opacity-90 animate-fade-in delay-300 font-body text-shadow">
                {currentItem.description}
              </p>
            </div>
          </div>
        )}
      </div>


      {/* Slide Indicators */}
      <div className="absolute bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-110 shadow-golden' 
                : 'bg-white/50 hover:bg-white/70 hover:scale-105'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};