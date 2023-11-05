import React from 'react';
import Bar from '../assets/Bar.png';
import Pie from '../assets/Pie.png';

const Graph = () => {
  return (
    <div className="flex" id="Visuals">
      <img
        src={Bar}
        alt="Graph"
        style={{ width: '950px', height: '678px' }}
      />
      <img
        src={Pie}
        alt="Graph2"
        style={{ width: '950px', height: '678px' }}
      />
    </div>
  );
};

export default Graph;
