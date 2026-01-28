import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const CardStack = ({ 
  items, 
  offset = 15, 
  scaleFactor = 0.06, 
  renderItem,
  onStackClick
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate logic (optional, user requested click, but auto-rotate is often included in CardStacks. 
  // I will leave it manual for now based on "user click" instruction).

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
    if (onStackClick) onStackClick();
  };

  return (
    <div 
      className="card-stack-container" 
      style={{ position: 'relative', width: '100%', height: '100%', perspective: '1000px' }}
    >
      {items.map((item, index) => {
        // Calculate relative index ensuring circular rotation
        const relativeIndex = (index - activeIndex + items.length) % items.length;

        // Optimization: Only render the top 4 cards
        if (relativeIndex > 3) return null;

        return (
          <motion.div
            key={item.id || index}
            className="absolute inset-0" // Using custom class or inline styles below
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              transformOrigin: 'top center',
              zIndex: items.length - relativeIndex,
              cursor: 'pointer'
            }}
            initial={false}
            animate={{
              top: relativeIndex * offset,
              scale: 1 - relativeIndex * scaleFactor, // Shrink cards behind
              opacity: relativeIndex === 0 ? 1 : 1 - relativeIndex * 0.2, // Fade cards behind
              filter: relativeIndex === 0 ? 'blur(0px)' : 'blur(2px)', // Blur cards behind
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            onClick={handleNext}
          >
            {/* Render the custom content for this card */}
            {renderItem(item, relativeIndex === 0)} 
          </motion.div>
        );
      })}
    </div>
  );
};
