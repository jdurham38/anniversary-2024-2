import React from 'react';
import myImage from './images/img1.jpg'; // Adjust the path as necessary

interface PolaroidPictureProps {
  caption?: string; // Optional caption to display below the image
}

const PolaroidPicture: React.FC<PolaroidPictureProps> = ({ caption }) => {
  return (
    <div style={styles.polaroidContainer}>
      {/* Image section */}
      <div style={styles.imageContainer}>
        <img src={myImage} alt="Polaroid" style={styles.image as React.CSSProperties} />
      </div>

      {/* Caption section */}
      {caption && <div style={styles.caption}>{caption}</div>}
    </div>
  );
};

// Inline styles for the Polaroid picture appearance
const styles = {
  polaroidContainer: {
    width: '250px', // A typical width for a Polaroid
    backgroundColor: '#fff',
    padding: '10px 10px 25px 10px', // Bottom padding to create the Polaroid border effect
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    textAlign: 'center' as const,
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    display: 'inline-block',
    margin: '20px',
  },
  imageContainer: {
    backgroundColor: '#000', // Black background for the image holder like in the reference
    width: '100%',
    height: '0',
    paddingBottom: '100%', // Aspect ratio of 1:1 for a square photo
    overflow: 'hidden',
    position: 'relative' as const, // To position the image within the container
  },
  image: {
    position: 'absolute' as const, // The image is absolutely positioned
    top: '10%', // Space around the image
    left: '10%', // Space around the image
    width: '80%', // Image width (leaving some black space around)
    height: '80%', // Image height (leaving some black space around)
    objectFit: 'cover' as React.CSSProperties['objectFit'], // Ensure the image fits nicely
  },
  caption: {
    marginTop: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
};

export default PolaroidPicture;
