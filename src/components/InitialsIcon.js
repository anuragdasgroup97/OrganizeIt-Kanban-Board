import React from 'react';
import './InitialsIcon.css'; 

const InitialsIcon = ({ name }) => {
  // Extracting initials from the name
  const initials = name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('');

  const backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16); // Random color

  return (
    <div className="initials-icon" style={{ backgroundColor }}>
      {initials}
    </div>
  );
};

export default InitialsIcon;
