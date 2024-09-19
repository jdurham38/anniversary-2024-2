import { useDrag } from '@use-gesture/react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Card from './Card'; // Import the new Card component

const Envelope: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Tracks if the envelope is opened
  const [isClosed, setIsClosed] = useState(true); // Tracks if the envelope is closed
  const [isCardClicked, setIsCardClicked] = useState(false); // Track card click to display full card

  // Remove the threshold and useDrag logic since we'll open the envelope on click
  // You can keep the drag interaction as an additional option if desired

  // Handle click to open the envelope flap
  const handleFlapClick = () => {
    if (!isOpen && isClosed) {
      setIsOpen(true);
      setIsClosed(false);
    }
  };

  // Handle click to show full card
  const handleCardClick = () => {
    setIsCardClicked(true); // Expand the card fully when clicked
  };

  return (
    <div
      className="envelope-wrapper"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        backgroundColor: '#B0E0E6', // Gray background to match the reference images
      }}
    >
      <div
        className="envelope-container"
        style={{ position: 'relative', width: 350, height: 220 }}
      >
        {/* Triangular Flap of the Envelope */}
        <motion.div
          // Removed the drag gesture binding
          className="envelope-flap"
          style={{
            width: 0,
            height: 0,
            borderLeft: '175px solid transparent',
            borderRight: '175px solid transparent',
            borderTop: '80px solid #C14141', // Flap color pointing down initially
            position: 'absolute',
            top: 78, // Flap starts covering the envelope
            left: 2,
            touchAction: 'none', // Disable default touch behavior
            transformOrigin: 'top center', // Anchor rotation at the top center
            cursor: 'pointer', // Change cursor to pointer to indicate clickable
            zIndex: isClosed ? 4 : 2, // Flap is on top when the envelope is closed, behind the card when opened
          }}
          animate={isOpen ? { rotateX: -180 } : { rotateX: 0 }} // Open the flap upwards
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={handleFlapClick} // Open envelope on click
        />

        {/* Open Me Text */}
        {!isOpen && (
          <div
            style={{
              position: 'absolute',
              top: 90, // Adjust this value to position the text vertically
              left: 0,
              width: '100%', // Full width of the envelope
              textAlign: 'center',
              fontFamily: "'Great Vibes', cursive", // Romantic cursive font
              fontSize: '24px',
              color: '#FFFFFF', // Text color
              zIndex: 5, // Above the flap
              pointerEvents: 'none', // So it doesn't interfere with clicks
            }}
          >
            Open Me
          </div>
        )}

        {/* Card Peeking Logic */}
        <motion.div
          className="card-preview"
          style={{
            width: '300px',
            height: '100px', // Only a portion of the card is visible initially
            backgroundColor: '#E0E0E0',
            position: 'absolute',
            top: '30px', // Peeking out slightly
            left: '25px',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for the card
            zIndex: isOpen ? 3 : -1, // Show the card when the envelope is opened
            overflow: 'hidden',
            cursor: 'pointer', // Indicate clickable behavior
          }}
          animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Fade and slide when opened
          transition={{ duration: 0.3 }} // Smooth transition for visibility
          whileHover={{ y: -20 }} // Hover to move the card out slightly
          onClick={handleCardClick} // Show the full card on click
        >
          <motion.div style={{ padding: 20, color: '#8c8c8c', height: '100%' }}>
            <motion.span
              style={{
                fontSize: '12px',
                color: '#c14141',
                marginTop: '10px',
              }}
            >
              Click on me!
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Bottom Part of the Envelope */}
        <div
          className="envelope-bottom"
          style={{
            width: '350px',
            height: '140px', // Bottom height is 140px to match the proportions
            backgroundColor: '#E95A5A', // Bottom part of the envelope color
            position: 'absolute',
            bottom: 0,
            left: 0,
            borderRadius: '9px', // Rounded edges for a smooth look
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Adds shadow like the reference images
            border: '2px solid #C14141', // Darker color for the edges
            zIndex: isOpen ? 3 : 2, // Envelope body is on top of the card but below the flap when closed
          }}
        />

        {/* Card Component - Full display on click */}
        {isCardClicked && (
          <motion.div
            initial={{ y: 0, opacity: 0, scale: 0.9 }} // Start from slightly hidden inside the envelope
            animate={{ y: -100, opacity: 1, scale: 1 }} // Slide up out of the envelope
            transition={{ duration: 0.5, ease: 'easeOut' }} // Smooth slide-out effect
            style={{
              position: 'absolute',
              top: '30px',
              left: '20px',
              zIndex: 4, // Ensure it appears above other elements
              width: '300px',
              borderRadius: '10px',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Card isClicked={isCardClicked} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Envelope;
