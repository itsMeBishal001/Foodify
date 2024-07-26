import React, { useEffect, useRef, useState } from 'react';
import { CDN_IMG_URL_RES } from '../utils/config';
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";
import { Tooltip } from 'react-tooltip';

const CategoryCarousel = ({ categories, userName }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current slide index
  const [visibleCards, setVisibleCards] = useState(1); // Track number of visible cards
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].offsetWidth;
      const visibleCardsCount = Math.floor(carouselRef.current.clientWidth / cardWidth);
      setVisibleCards(visibleCardsCount);
    }

    // Determine the current time and set the greeting
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, [categories]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].offsetWidth;
      const newOffset = Math.max(0, carouselRef.current.scrollLeft - cardWidth);
      carouselRef.current.scrollTo({ left: newOffset, behavior: 'smooth' });
      setCurrentIndex(Math.floor(newOffset / cardWidth));
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0].offsetWidth;
      const currentOffset = carouselRef.current.scrollLeft;
      const totalWidth = carouselRef.current.scrollWidth;
      const newOffset = Math.min(totalWidth - carouselRef.current.clientWidth, currentOffset + cardWidth);
      carouselRef.current.scrollTo({ left: newOffset, behavior: 'smooth' });
      setCurrentIndex(Math.floor(newOffset / cardWidth));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (carouselRef.current) {
        const cardWidth = carouselRef.current.children[0].offsetWidth;
        const newIndex = Math.round(carouselRef.current.scrollLeft / cardWidth);
        setCurrentIndex(newIndex);
      }
    };
    const currentRef = carouselRef.current;
    currentRef.addEventListener('scroll', handleScroll);

    return () => {
      currentRef.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const totalCards = categories.length;

  return (
    <div className="relative">
      {/* Username Section */}
      {userName && (
        <>
          <div className="welcome-section mb-4">
            <h2 className="text-2xl font-display font-bold mb-1 animate-fadeIn text-primary">
              {greeting}, {userName}!
            </h2>
            <p className="text-base mb-2 animate-fadeIn text-gray-700">What would you like to order today?</p>
          </div>
          <Tooltip id="tooltip" />
        </>
      )}

      <div
        ref={carouselRef}
        className="flex overflow-hidden space-x-6 p-4 scrollbar-hide" // Hide default scrollbar
      >
        {categories.map((category) => (
          <img
            key={category.id}
            src={CDN_IMG_URL_RES + category.imageId}
            alt={category.accessibility.altText}
            className="h-32 w-32 sm:h-36 sm:w-36 md:h-44 md:w-44 lg:h-52 lg:w-52 object-cover cursor-pointer"
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <IoArrowBackOutline
        color='black'
        size={30}
        onClick={scrollLeft}
        className={`absolute top-1/4 right-10  transform -translate-y-1/2 focus:outline-none cursor-pointer ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Scroll Left"
        disabled={currentIndex === 0}
      />
      <IoArrowForwardOutline
        color='black'
        size={30}
        onClick={scrollRight}
        className={`absolute top-1/4 right-2 transform -translate-y-1/2 focus:outline-none cursor-pointer  ${currentIndex >= totalCards - visibleCards ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label="Scroll Right"
        disabled={currentIndex >= totalCards - visibleCards}
      />
    </div>
  );
};

export default CategoryCarousel;
