import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import PolaroidPicture from './PolaroidPicture';
import Confetti from 'react-confetti';
import HoneyComb from './HexagonGrid/HoneyComb';

interface CardProps {
  isClicked: boolean; // Whether the card is clicked to fully display it
}

const Card: React.FC<CardProps> = ({ isClicked }) => {
  const [isCardOpen, setIsCardOpen] = useState(false); // Tracks if the card is opened from right to left
  const [showConfetti, setShowConfetti] = useState(false); // Tracks if confetti should be shown

  const handleArrowClick = () => {
    setIsCardOpen(!isCardOpen); // Toggle card open/close
  };

  // Show confetti when the card is fully opened
  useEffect(() => {
    if (isCardOpen) {
      setShowConfetti(true);
      // Stop confetti after a few seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000); // Confetti duration in milliseconds

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [isCardOpen]);

  return (
    <motion.div
      className="card-wrapper"
      style={{
        width: '800px', // Full width includes both second and third pages
        height: '500px',
        position: 'absolute',
        top: '-100px', // Position it coming from the envelope
        left: '-20px',
        perspective: '1500px', // Add perspective for 3D effect
        zIndex: 6,
        display: 'flex',
      }}
    >
      {/* Confetti when card is fully opened */}
      {showConfetti && (
        <Confetti
          width={800} // Adjust width of confetti area
          height={800} // Adjust height of confetti area
          numberOfPieces={200} // Number of confetti pieces
          recycle={false} // Confetti will not recycle, it will only fall once
          style={{
            position: 'absolute', // Ensure confetti positioning is absolute
            top: '10px', // Adjust the top position
            left: '-395px', // Adjust the left position
            pointerEvents: 'none', // Prevents confetti from blocking other interactions
            zIndex: 10,
          }}
        />
      )}

      {/* Third page (static, background for the second page) */}
      <motion.div
  className="card-third"
  style={{
    width: '360px',
    height: '92%',
    backgroundColor: '#E0FFFF',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', // Add padding for spacing
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1,
  }}
>
  <p
    style={{
      fontFamily: "'Pacifico', cursive",
      fontSize: '20px',
      color: '#6495ED',
      textAlign: 'center',
      lineHeight: '1.2',
      margin: 0,
      whiteSpace: 'pre-line', // Preserve line breaks
      
    }}
  >
    {`My Love,
    
With a woman as gracious and gorgeous as you
We've breezed through another year
We made an enormous life change
Been through many struggles
But we've loved and laughed through it all
When I'm in a difficult space
You provide unconditional love and support
Your smile and laugh always get me through difficult times
But you always see the best in me
If 'soulmates' do truly exist
Then I'm thankful for the first time we kissed

I love you`}
  </p>
</motion.div>


      {/* Card container for the front and second page */}
      <motion.div
        style={{
          width: '400px',
          height: '100%',
          position: 'absolute',
          transformStyle: 'preserve-3d', // Enable 3D transform for rotation
          transformOrigin: 'left', // Rotate from the left side
          transform: isCardOpen ? 'rotateY(-180deg)' : 'rotateY(0deg)', // Rotate the front and second pages
          transition: 'transform 0.8s ease-in-out', // Smooth rotation animation
          zIndex: 2, // Second page is above the third page
        }}
      >
        {/* Front side (first page) of the card */}
        <motion.div
          className="card-front"
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#E0FFFF',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column', // Stack text above the Polaroid
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            backfaceVisibility: 'hidden', // Hide the back when front is showing
          }}
        >
          {/* Cursive text above the Polaroid picture */}
          <div
            style={{
              fontFamily: "'Pacifico', cursive", // Cursive font style
              fontSize: '24px',
              color: '#6495ED',
              marginBottom: '10px', // Space between text and Polaroid
            }}
          >
            Happy Anniversary Christina
          </div>

          <PolaroidPicture 
            caption="Joe Mama"
          />
        </motion.div>

        {/* Inside of the card (second page) */}
<motion.div

  className="card-inside"
  style={{
    width: '100%',
    height: '100%',
    backgroundColor: '#E0FFFF',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    transform: 'rotateY(180deg)', // Inside starts flipped, will show when the card is opened
    backfaceVisibility: 'hidden', // Hide the front when the inside is showing
  }}
>
<div
    style={{
      fontFamily: "'Pacifico', cursive", // Use a cursive font
      fontSize: '24px',
      color: '#6495ED',
      marginBottom: '0px', // Space between title and grid
    }}
  >
    Some Fun Moments
  </div>

  {/* Insert HexagonGrid component */}
  <HoneyComb />
</motion.div>

      </motion.div>

      {/* Arrow to open the card */}
      {isClicked && (
          <motion.div
            className="arrow"
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '300px', // Fixed position for the arrow
              cursor: 'pointer',
              fontSize: '24px',
              color: '#000000', // Arrow color set to black
              backgroundColor: '#6495ED', // Container color
              width: '40px',
              height: '40px',
              borderRadius: '50%', // Makes the container rounded
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 6, // Make sure the arrow stays on top
            }}
            onClick={handleArrowClick}
            whileHover={{ scale: 1.2 }} // Slightly enlarge the arrow on hover
          >
            {isCardOpen ? '←' : '→'} {/* Arrow changes direction */}
          </motion.div>
        )}

    </motion.div>
  );
};

export default Card;
