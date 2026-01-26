import React from 'react';

const Timeline = ({ items }) => {
  return (
    <div className="timeline-container">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="timeline-item"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {/* Date aligned to the left (desktop) or top (mobile) */}
          <div className="timeline-date">{item.date}</div>
          
          {/* Node on the line */}
          <div className="timeline-node" aria-hidden="true"></div>
          
          {/* Content on the right - No Card */}
          <div className="timeline-content">
            <h3 className="timeline-title">{item.title}</h3>
            <div className="timeline-subtitle">{item.subtitle}</div>
            {item.description && (
              <p className="timeline-description">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Timeline);
