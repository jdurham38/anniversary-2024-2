import React from 'react';
import './HoneyComb.css';

// Import your images
import img1 from './images/img1.jpg';
import img2 from './images/img2.jpg';
import img3 from './images/img3.jpg';
import img4 from './images/img4.jpg';
import img5 from './images/img5.jpg';
import img6 from './images/img6.jpg';
import img7 from './images/img7.jpg';

const HoneyComb: React.FC = () => {
  // Variables
  const n_rows = 3; // at least 1
  const n_cols_min = 2; // at least 1

  // Use the imported images
  const imgs = [img1, img2, img3, img4, img5, img6, img7];

  const n_cols_max = n_cols_min + 1;
  const n_cols_sum = n_cols_max + n_cols_min;
  const n =
    Math.ceil(0.5 * n_rows) * n_cols_min +
    Math.floor(0.5 * n_rows) * n_cols_max;
  const ni = imgs.length;

  // Generate the hex cells
  const cells = [];
  for (let i = 0; i < n; i++) {
    cells.push(
      <div className="hex-cell" key={i}>
        <img src={imgs[i % ni]} alt={`Hex cell ${i}`} />
      </div>
    );
  }

  // CSS variables
  const style = {
    '--n-rows': n_rows.toString(),
    '--n-cols': (2 * n_cols_max).toString(),
  } as React.CSSProperties & { [key: string]: string };

  return (
    <div className="honeycomb-container" style={style}>
      <style>{`
        .hex-cell:nth-of-type(${n_cols_sum}n + 1) {
          grid-column-start: 2;
        }
      `}</style>
      {cells}
    </div>
  );
};

export default HoneyComb;
