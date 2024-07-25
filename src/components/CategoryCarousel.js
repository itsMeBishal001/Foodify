import React, { useRef } from 'react';

const CategoryCarousel = ({ categories }) => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-6 p-4 scrollbar-hide"
      >
        {categories.map((category) => (
          <a
            key={category.id}
            href={category.action.link}
            className="flex flex-col items-center text-center space-y-2"
            aria-label={category.accessibility.altTextCta}
          >
            <img
              src={category.imageId}
              alt={category.accessibility.altText}
              className="h-24 w-24 object-cover rounded-full"
            />
            <span className="text-sm">{category.description}</span>
          </a>
        ))}
      </div>
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        aria-label="Scroll Left"
      >
        &lt;
      </button>
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        aria-label="Scroll Right"
      >
        &gt;
      </button>
    </div>
  );
};

export default CategoryCarousel;
